(*********************************************************************************
 * Copyright: Bernecker + Rainer
 * Author:  B+R
 * Created:  July 27, 2016/10:44 AM 
 *********************************************************************************
 *********************************************************************************
 * Version History:
 * -------------------------------------------------------------------------------
 * V 1.00.0   July 27, 2016/10:44 AM  First Version
 *********************************************************************************
 * Description:
 * -------------------------------------------------------------------------------
 * July 27, 2016/10:44 AM V1.00.0:
 * This task is an example OF simple SuperTrak control
 *********************************************************************************)

PROGRAM _INIT
 
 	(*************************************************************************************************)
 	(*************************************************************************************************)
 	(* FUNCTION BLOCK CONFIGURATION *)
 
 	// Configure the internal communication structure to/from SuperTrak
	SuperTrakControlParameters.NrOfCommands 	:= CONFIG_ST_MAX_COMMANDS;
	SuperTrakControlParameters.NrOfPallets  	:= CONFIG_ST_MAX_PALLETS;
	SuperTrakControlParameters.NrOfSections 	:= CONFIG_ST_MAX_SECTIONS;
	SuperTrakControlParameters.NrOfTargets  	:= CONFIG_ST_MAX_TARGETS;
 
	// Configure a simple pallet routing
	TargetControlParameters[0].AdvancedReleaseConfig.DestinationTarget 	:= 2;
	TargetControlParameters[0].AdvancedReleaseConfig.Direction   		:= stCOM_DIR_RIGHT;
 
	TargetControlParameters[1].AdvancedReleaseConfig.DestinationTarget 	:= 1;
	TargetControlParameters[1].AdvancedReleaseConfig.Direction   		:= stCOM_DIR_LEFT;
 
	(*************************************************************************************************)
	(*************************************************************************************************)
	(* FUNCTION BLOCK INITIALIZATION *)

	// Initialize the function block, handling the communication to/from SuperTrak
	StControl_0.StLink      	 				:= ADR(gStLink);
	StControl_0.Enable       					:= TRUE;
	StControl_0.Parameters      				:= ADR(SuperTrakControlParameters);
	StControl_0.StCtrlData      				:= ADR(gStCyclicControlData);
	StControl_0.StCtrlDataSize     				:= SIZEOF(gStCyclicControlData);
	StControl_0.StStatData      				:= ADR(gStCyclicStatusData);
	StControl_0.StStatDataSize     				:= SIZEOF(gStCyclicStatusData);
	StControl_0.StServChRequestData   			:= ADR(gStServiceChannelReqData);
	StControl_0.StServChRequestDataSize  		:= SIZEOF(gStServiceChannelReqData);
	StControl_0.StServChResponseData  			:= ADR(gStServiceChannelResData);
	StControl_0.StServChResponseDataSize 		:= SIZEOF(gStServiceChannelResData);
 
	// Initialize the fucntion blocks, controlling a single section
	FOR Index := 0 TO (SIZEOF(StSection_) / SIZEOF(StSection_[0])) - 1 DO
		StSection_[Index].StLink    			:= ADR(gStLink);
		StSection_[Index].Parameters   			:= ADR(SuperTrakSectionParameters);
		StSection_[Index].Section    			:= Index + 1;
	END_FOR;

	// Initialize the fucntion blocks, controlling a single section
	FOR Index := 0 TO (SIZEOF(StTargetExt_) / SIZEOF(StTargetExt_[0])) - 1 DO
		StTargetExt_[Index].StLink    			:= ADR(gStLink);
		StTargetExt_[Index].Parameters  		:= ADR(TargetControlParameters[Index]);
		StTargetExt_[Index].Target    			:= Index + 1;
	END_FOR;
	
	// Initialize the fucntion blocks, controlling a single section
	FOR Index := 0 TO (SIZEOF(StPallet_) / SIZEOF(StPallet_[0])) - 1 DO
		StPallet_[Index].StLink 				:= ADR(gStLink);
		StPallet_[Index].Parameters 			:= ADR(PalletControlParameters[Index]);
	END_FOR;
	
	// Start of the Expert mode
	StateCnc									:= EXPERT_MODE_START;
	CncStartTarget								:= 1;
	
	// Get the used cycle time
	RTInfo_0.enable								:= TRUE;
	RTInfo_0();
	CycleTime									:= UDINT_TO_REAL(RTInfo_0.cycle_time)/1000;
	
	// Set default movement parameter
	gMax_Velocity								:= 2000;	// 2m/s * 1000
	gMax_Acceleration							:= 10;		// 10m/s²
	Max_Acceleration_Converted					:= gMax_Acceleration * 64;	// 64 --> Q6 --> 2^6
	
	ActualMode									:= 0;
	
	Timer_0.PT									:= T#10ms;
	
	ExpertModeWarningTimer.PT					:= T#5000ms;
	
END_PROGRAM

PROGRAM _CYCLIC
	
 	(*************************************************************************************************)
 	(*************************************************************************************************)
 	(* FUNCTION BLOCK ENABLE *)
 
 	// Wait for StControl to be active, before enalbing all other function blocks
	IF StControl_0.Active THEN
		// Loop thru all StSection function blocks
		FOR Index := 0 TO (SIZEOF(StSection_) / SIZEOF(StSection_[0])) - 1 DO
			// Enable StSection
			StSection_[Index].Enable     		:= TRUE; 
			IF StSection_[Index].Error = FALSE AND StSection_[Index].Info.SuperTrak.SectionFaultActive = FALSE AND StSection_[Index].ErrorReset THEN
				StSection_[Index].ErrorReset	:= FALSE;
			END_IF;
		END_FOR;
		
		// Loop thru all StTargetExt function blocks
		FOR Index := 0 TO (SIZEOF(StTargetExt_) / SIZEOF(StTargetExt_[0])) - 1 DO
			// Enable StTargetExt
			StTargetExt_[Index].Enable     		:= TRUE; 
			IF StTargetExt_[Index].Error = FALSE AND StTargetExt_[Index].ErrorReset THEN
				StTargetExt_[Index].ErrorReset	:= FALSE;
			END_IF;
		END_FOR;
		
		// Loop thru all StPallet function blocks
		FOR Index := 0 TO (SIZEOF(StPallet_) / SIZEOF(StPallet_[0])) - 1 DO
			StPallet_[Index].PalletID 			:= ShuttlePosition[Index].palletID;
			IF StPallet_[Index].PalletID > 0 THEN
				// Enable StPallet
				StPallet_[Index].Enable 		:= TRUE;
				IF StPallet_[Index].Error = FALSE AND StPallet_[Index].ErrorReset THEN
					StPallet_[Index].ErrorReset	:= FALSE;
				END_IF;
			END_IF;
		END_FOR;
	END_IF;
	
	SuperTrakControl.Status.Standstill			:= FALSE;
	SuperTrakControl.Status.CommandBusy			:= FALSE;
	
	IF SuperTrakControl.Command.EnableAllSections = FALSE THEN
		ActualState								:= POWER_OFF;
	END_IF;
	
	Error	:= FALSE; 
	// Loop thru all StSection function blocks
	FOR Index := 0 TO (SIZEOF(StSection_) / SIZEOF(StSection_[0])) - 1 DO
		IF StSection_[Index].Error OR StSection_[Index].Info.SuperTrak.SectionFaultActive THEN
			Error	:= TRUE;
		END_IF;
	END_FOR;
 
	// Loop thru all StTargetExt function blocks
	FOR Index := 0 TO (SIZEOF(StTargetExt_) / SIZEOF(StTargetExt_[0])) - 1 DO
		IF StTargetExt_[Index].Error THEN
			Error	:= TRUE;
		END_IF;
	END_FOR;
	
	// Loop thru all StPallet function blocks
	FOR Index := 0 TO (SIZEOF(StPallet_) / SIZEOF(StPallet_[0])) - 1 DO
		IF StPallet_[Index].Error THEN
			Error	:= TRUE;
		END_IF;
	END_FOR;
	
	IF Error THEN
		ActualState	:= ERROR;
	END_IF;
	
	IF Acknowledge AND Error THEN
				
		StControl_0.ErrorReset						:= TRUE;
 
		// Loop thru all StSection function blocks
		FOR Index := 0 TO (SIZEOF(StSection_) / SIZEOF(StSection_[0])) - 1 DO
			StSection_[Index].ErrorReset			:= TRUE;
		END_FOR;
 
		// Loop thru all StTargetExt function blocks
		FOR Index := 0 TO (SIZEOF(StTargetExt_) / SIZEOF(StTargetExt_[0])) - 1 DO
			StTargetExt_[Index].ErrorReset			:= TRUE;
		END_FOR;
	
		// Loop thru all StPallet function blocks
		FOR Index := 0 TO (SIZEOF(StPallet_) / SIZEOF(StPallet_[0])) - 1 DO
			StPallet_[Index].ErrorReset				:= TRUE;
		END_FOR;
		
		SuperTrakControl.Command.EnableAllSections	:= FALSE;
		
	END_IF;
	
	IF SafetyShutDownShuttles THEN
		StopMode					:= TRUE;
		cmd_StopTracking			:= TRUE;
	END_IF;
	
	CASE ActualState OF
		POWER_OFF:
			// Reset the global status if the sections are not enabled
			gAllSectionsEnabled 	:= FALSE;
			SafetyShutDownShuttles	:= FALSE;
			Status					:= '$$Page.StatusSystemOff';
		
			(*************************************************************************************************)
			(*************************************************************************************************)
			(* ENABLE / DISABLE SUPERTRAK SECTIONS *)
	
			// Wait for command, to enable all sections
			IF SuperTrakControl.Command.EnableAllSections THEN
				// Loop thru all StSection function blocks
				FOR Index := 0 TO (SIZEOF(StSection_) / SIZEOF(StSection_[0])) - 1 DO
					// Check if section is ready to be enalbed
					IF StSection_[Index].MotorPowerOn AND NOT StSection_[Index].Error THEN
						// Enable section
						StSection_[Index].EnableSection := TRUE;
						Status							:= '$$Page.StatusRecovering';
					END_IF; 
				END_FOR;
			ELSE
				FOR Index := 0 TO (SIZEOF(StSection_) / SIZEOF(StSection_[0])) - 1 DO
					StSection_[Index].EnableSection 	:= FALSE;
				END_FOR;
			END_IF;
			
			IF StControl_0.SectionsEnabled AND (SuperTrakControl.Status.Mode1 OR SuperTrakControl.Status.Mode2 OR SuperTrakControl.Status.Mode3 OR SuperTrakControl.Status.TrackingEnabled) THEN
				ActualState								:= MODE_STOPPING;
				
				// Set global status to true if all sections are enabled
				gAllSectionsEnabled 					:= TRUE;
			ELSIF StControl_0.SectionsEnabled AND ShuttleStandstill AND SuperTrakControl.Command.EnableAllSections THEN				
				ActualState								:= POWER_ON;
				
				// Set global status to true if all sections are enabled
				gAllSectionsEnabled 					:= TRUE;
			END_IF;
		
		POWER_ON:
			CASE ActualMode OF
				0:
					IF StartMode THEN
						ActualState						:= MODE_1;
					END_IF;
			
				1:
					IF StartMode THEN
						ActualState						:= MODE_2;
					END_IF;
			
				2:
					IF StartMode THEN
						ActualState						:= MODE_3;
					END_IF;
			
			END_CASE;
			
			IF cmd_StartTracking THEN
				ActualState								:= EXPERT_MODE;
			END_IF;
		
			IF ShuttleStandstill THEN
				Status	:= '$$Page.StatusStandstill';
				SuperTrakControl.Status.Standstill		:= TRUE;
			ELSE
				Status	:= '$$Page.StatusRecovering';
			END_IF;
			
			LockButtons	:= NOT(SuperTrakControl.Status.CommandBusy);
			
			IF SafetyShutDownShuttles THEN
				SuperTrakControl.Command.EnableAllSections	:= FALSE;
			END_IF;
		
		MODE_1:
			cmd_StartMode1 	:= TRUE;
			Mode1;
			SuperTrakControl.Status.CommandBusy			:= TRUE;
		
		MODE_2:
			cmd_StartMode2 	:= TRUE;
			Mode2;
			SuperTrakControl.Status.CommandBusy			:= TRUE;
		
		MODE_3:
			cmd_StartMode3 	:= TRUE;
			Mode3;
			SuperTrakControl.Status.CommandBusy			:= TRUE;
		
		EXPERT_MODE:
			ExpertMode;
			SuperTrakControl.Status.CommandBusy			:= TRUE;
		
		MODE_STOPPING:
			Status		:= '$$Page.StatusRecovering';
			StartMode	:= FALSE;
			
			IF SuperTrakControl.Status.Mode1 THEN
				StopMode								:= TRUE;
				Mode1;
			ELSIF SuperTrakControl.Status.Mode2 THEN
				StopMode								:= TRUE;
				Mode2;
			ELSIF SuperTrakControl.Status.Mode3 THEN
				StopMode								:= TRUE;
				Mode3;
			ELSIF SuperTrakControl.Status.TrackingEnabled THEN
				StateCnc								:= EXPERT_MODE_STOP;
				ExpertMode;
			ELSE
				FOR Index := 1 TO (SIZEOF(TargetControlParameters) / SIZEOF(TargetControlParameters[0])) - 1 DO
					TargetControlParameters[Index].AdvancedReleaseConfig.DestinationTarget 	:= 1;
					TargetControlParameters[Index].AdvancedReleaseConfig.TargetOffsetIdx	:= 0;
					TargetControlParameters[Index].AdvancedReleaseConfig.Direction	       	:= stCOM_DIR_RIGHT; 
					
					IF StTargetExt_[Index].PalletPresent AND StTargetExt_[Index].CommandDone = FALSE THEN
						StTargetExt_[Index].ReleaseToTarget		:= TRUE;
					ELSE 
						StTargetExt_[Index].ReleaseToTarget 	:= FALSE;
						StTargetExt_[Index].ReleaseToOffset		:= FALSE;
						StTargetExt_[Index].SetPalletMotionPar	:= FALSE;
					END_IF;
				END_FOR;
				
				FOR Index := 0 TO (SIZEOF(StPallet_)/SIZEOF(StPallet_[0])) - 1 DO
					StPallet_[Index].ReleaseToTarget			:= FALSE;
					StPallet_[Index].SetPalletMotionPar			:= FALSE;
				END_FOR;
				
				IF StTargetExt_[0].PalletPresent AND ShuttleStandstill THEN
					ActualState									:= POWER_ON;
				END_IF;
			END_IF;
		
		ERROR:
			Status		:= '$$Page.StatusError';
		
			IF SafetyShutDownShuttles THEN
				SuperTrakControl.Command.EnableAllSections	:= FALSE;
				FOR Index := 0 TO (SIZEOF(StSection_) / SIZEOF(StSection_[0])) - 1 DO
					// Enable section
					StSection_[Index].EnableSection 		:= FALSE;
				END_FOR;
			END_IF;
			
			FOR Index := 0 TO (SIZEOF(StTargetExt_) / SIZEOF(StTargetExt_[0])) - 1 DO
				StTargetExt_[Index].ReleaseToOffset		:= FALSE;
				StTargetExt_[Index].ReleaseToTarget		:= FALSE;
				StTargetExt_[Index].SetPalletMotionPar	:= FALSE;
				StTargetExt_[Index].Update				:= FALSE;
			END_FOR;
	
			// Loop thru all StPallet function blocks
			FOR Index := 0 TO (SIZEOF(StPallet_) / SIZEOF(StPallet_[0])) - 1 DO
				StPallet_[Index].ReleaseToTarget		:= FALSE;
				StPallet_[Index].SetPalletMotionPar		:= FALSE;
				StPallet_[Index].Update					:= FALSE;
			END_FOR;
		
			Recovering	:= TRUE;
			//SuperTrakControl.Status.CommandBusy			:= TRUE;
			
			IF Error = FALSE THEN
				ActualState	:= RECOVERING;
			END_IF;
			
		RECOVERING:
			Status		:= '$$Page.StatusError';
			
			IF ControlledShuttle > 0 THEN
				StPallet_[ControlledShuttle-1].ReleaseToTarget	:= FALSE;
				StateCnc					:= EXPERT_MODE_START;
				cmd_StartTracking			:= FALSE;
				cmd_StopTracking			:= FALSE;
				gMpAxisBasic_0.MoveAbsolute	:= FALSE;
				gMpAxisBasic_0.MoveAdditive	:= FALSE;
				gMpAxisBasic_0.MoveVelocity	:= FALSE;
				gMpAxisBasic_0.JogNegative	:= FALSE;
				gMpAxisBasic_0.JogPositive	:= FALSE;
				SuperTrakControl.Status.TrackingEnabled			:= FALSE;
			END_IF;
		
			cmd_StartMode1 	:= FALSE;
			cmd_StopMode1	:= FALSE;
			SuperTrakControl.Status.Mode1		:= FALSE;
		
			cmd_StartMode2 	:= FALSE;
			cmd_StopMode2	:= FALSE;
			ParameterSet	:= FALSE;
			CounterMode2.Station1				:= 0;
			CounterMode2.Station3				:= 0;
			SuperTrakControl.Status.Mode2		:= FALSE;
		
			cmd_StartMode3 	:= FALSE;
			cmd_StopMode3	:= FALSE;
			ShuttleReady	:= FALSE;
			Counter			:= 0;
			SuperTrakControl.Status.Mode3		:= FALSE;
			ParameterSet						:= FALSE;
			
			SuperTrakControl.Status.CommandBusy	:= TRUE;
		
			(*************************************************************************************************)
			(*************************************************************************************************)
			(* ENABLE / DISABLE SUPERTRAK SECTIONS *)
	
			// Wait for command, to enable all sections
			IF SuperTrakControl.Command.EnableAllSections THEN
				// Loop thru all StSection function blocks
				FOR Index := 0 TO (SIZEOF(StSection_) / SIZEOF(StSection_[0])) - 1 DO
					// Check if section is ready to be enalbed
					IF StSection_[Index].MotorPowerOn AND NOT StSection_[Index].Error THEN
						// Enable section
						StSection_[Index].EnableSection := TRUE;
						Status							:= '$$Page.Recovering';
					END_IF; 
				END_FOR;
			END_IF;
			IF StControl_0.SectionsEnabled AND ShuttleStandstill THEN				
				ActualState								:= POWER_ON;
				
				// Set global status to true if all sections are enabled
				gAllSectionsEnabled 					:= TRUE;
			END_IF;

	END_CASE;
	
	LockButtons	:= NOT(SuperTrakControl.Status.CommandBusy);
	
	(*************************************************************************************************)
	(*************************************************************************************************)
	(* FUNCTION BLOCK CALLS *)
 
	// Call StControl
	StControl_0();
 
	// Loop thru all StSection function blocks
	FOR Index := 0 TO (SIZEOF(StSection_) / SIZEOF(StSection_[0])) - 1 DO
		// Call StSection
		StSection_[Index]();
	END_FOR;
 
	// Loop thru all StTargetExt function blocks
	FOR Index := 0 TO (SIZEOF(StTargetExt_) / SIZEOF(StTargetExt_[0])) - 1 DO
		// Call StTargetExt
		StTargetExt_[Index]();
	END_FOR;
	
	// Loop thru all StPallet function blocks
	FOR Index := 0 TO (SIZEOF(StPallet_) / SIZEOF(StPallet_[0])) - 1 DO
		// Call StPallet
		StPallet_[Index]();
	END_FOR;
	
	(*************************************************************************************************)
	(*************************************************************************************************)
	(* GET LICENSE INFORMATION *)
	
	ExpertModeAvailable								:= FALSE;
	
	IF DiagCpuIsSimulated() THEN
		ExpertModeAvailable							:= TRUE;
	END_IF;
	
	IF ExpertModeAvailable = FALSE THEN
		GuardGetLicenses.enable						:= TRUE;
		GuardGetLicenses.maxNumLicenses				:= (SIZEOF(Licenses) / SIZEOF(Licenses[0])) - 1;
		GuardGetLicenses.pLicenses					:= ADR(Licenses);
		GuardGetLicenses();
		
		FOR Index := 0 TO (SIZEOF(Licenses) / SIZEOF(Licenses[0])) - 1 DO
			IF Licenses[Index].orderNumber = ExpertModeOrderNumber THEN
				ExpertModeAvailable					:= TRUE;
			END_IF;
		END_FOR;
	END_IF;
	
	JogAvailable	:= ExpertModeAvailable AND SuperTrakControl.Status.Standstill AND NOT(SuperTrakControl.Status.CommandBusy);
 	JogPopUp		:= NOT(JogAvailable) AND NOT(SuperTrakControl.Status.TrackingEnabled);
	
	ShowPopUp;
	ShowPopUpHome;
	
	(*************************************************************************************************)
	(*************************************************************************************************)
	(* WRITE PARAMETER *)
	
	MaxSpeed_Calc		:= SQRT(2*gMax_Acceleration*0.33)*1000;
	
	IF gMax_Velocity > MaxSpeed_Calc THEN
		gMax_Velocity	:= REAL_TO_INT(MaxSpeed_Calc);
	END_IF;
	
	IF SuperTrakControl.Status.AllSectionsEnabled AND Timer_0.Q THEN
		Timer_0.IN		:= FALSE;
		
		SuperTrakServChanWrite(0,MAX_VELOCITY_PARID,0,1,ADR(gMax_Velocity),SIZEOF(gMax_Velocity));
		
		Max_Acceleration_Converted	:= gMax_Acceleration * 64;	// 64 --> Q6 --> 2^6
		SuperTrakServChanWrite(0,MAX_ACCELERATION_PARID,0,1,ADR(Max_Acceleration_Converted),SIZEOF(Max_Acceleration_Converted));
	ELSE
		Timer_0.IN		:= TRUE;
	END_IF;
	Timer_0();
	
	CheckStandstill;
	SuperTrakGetPalletInfo(ADR(ShuttlePosition),CONFIG_USED_SHUTTLES,TRUE);
	
	(*************************************************************************************************)
	(*************************************************************************************************)
	(* MAPPING OF STATUS VARIABLES *)
 
	// Set information on wether all sections are enabled or not, to command structure
	SuperTrakControl.Status.AllSectionsEnabled   	:= StControl_0.SectionsEnabled;
	SuperTrakControl.Status.AllSectionsDisabled		:= NOT(StControl_0.SectionsEnabled);
	
	IF SelectedLanguage = 0 THEN
		Document	:= 'Media/PR_en.pdf';
	ELSE
		Document	:= 'Media/PR_de.pdf';
	END_IF;
	
	IF ExpertModeWarningTimer.Q THEN
		ExpertModeWarningTimer.IN	:= FALSE;
		StateCnc					:= EXPERT_MODE_EXECUTE;
	END_IF;
	
	ExpertModeWarningTimer();
	
	doSafetyLampGuard	:= SafetyLampGuard;
	doSafetyLampSiReset	:= SafetyLampSiReset OR Error;
	doExpertModeVisual	:= SuperTrakControl.Status.TrackingEnabled;
	doExpertModeSound	:= ExpertModeWarningTimer.IN;
	
	IF SafetyReqGuardUnlock THEN
		SafetyShutDownShuttles	:= TRUE;
	END_IF;
	
	SafetyForUnlockActive		:= SuperTrakControl.Status.AllSectionsDisabled AND ShuttleStandstill;
	
END_PROGRAM

PROGRAM _EXIT
	
	// Disable the FUB
	StControl_0.Enable	:= FALSE;
	// Call the StControl
	StControl_0();
	
	// Loop thru all StSection function blocks
	FOR Index := 0 TO (SIZEOF(StSection_) / SIZEOF(StSection_[0])) - 1 DO
		// Disable the FUB
		StSection_[Index].Enable	:= FALSE;
		// Call StSection
		StSection_[Index]();
	END_FOR;
 
	// Loop thru all StTargetExt function blocks
	FOR Index := 0 TO (SIZEOF(StTargetExt_) / SIZEOF(StTargetExt_[0])) - 1 DO
		// Disable the FUB
		StTargetExt_[Index].Enable	:= FALSE;
		// Call StTargetExt
		StTargetExt_[Index]();
	END_FOR;
	
	// Loop thru all StPallet function blocks
	FOR Index := 0 TO (SIZEOF(StPallet_) / SIZEOF(StPallet_[0])) - 1 DO
		// Disable the FUB
		StPallet_[Index].Enable		:= FALSE;
		// Call StPallet
		StPallet_[Index]();
	END_FOR;
	
	// Disable the FUB
	GuardGetLicenses.enable			:= FALSE;
	// Call GuardGetLicenses
	GuardGetLicenses();
	
END_PROGRAM
