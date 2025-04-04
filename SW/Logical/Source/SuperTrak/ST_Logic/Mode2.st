
(*****************************************************************************
 * Copyright: COPYRIGHT (C) BERNECKER + RAINER, AUSTRIA
 *****************************************************************************
 * Author:  B+R  Created:  June 21, 2017/10:34 AM
 *****************************************************************************
 * Description: Implementation of a Pallet-Control
 ******************************************************************************)
ACTION Mode2: 

	IF cmd_StartMode2 THEN
		
		Status		:= '$$Page.StatusMode2Active';
		Recovering	:= FALSE;
		
		IF ParameterSet = FALSE THEN
			FOR Index := 0 TO (SIZEOF(StPallet_) / SIZEOF(StPallet_[0])) - 1 DO
				PalletControlParameters[Index].PalletConfig.Motion.Acceleration	:= 40000;
				PalletControlParameters[Index].PalletConfig.Motion.Velocity		:= 2500;
				StPallet_[Index].SetPalletMotionPar								:= TRUE;
			END_FOR;
			IF StPallet_[0].CommandDone AND StPallet_[1].CommandDone AND StPallet_[2].CommandDone AND StPallet_[3].CommandDone THEN
				StPallet_[0].SetPalletMotionPar									:= FALSE;
				StPallet_[1].SetPalletMotionPar									:= FALSE;
				StPallet_[2].SetPalletMotionPar									:= FALSE;
				StPallet_[3].SetPalletMotionPar									:= FALSE;
				ParameterSet													:= TRUE;
			END_IF;
		END_IF;
		
		TargetControlParameters[0].AdvancedReleaseConfig.DestinationTarget	:= 7;
		TargetControlParameters[0].AdvancedReleaseConfig.Direction			:= stCOM_DIR_RIGHT;
		StTargetExt_[0].ReleaseToTarget	:= StTargetExt_[0].PalletPresent AND ParameterSet;
			
		CASE StateMode2.Station1 OF
//			SET_PARAMETER_MOD2_STAT1:
//				TargetControlParameters[6].PalletConfig.Motion.Velocity		:= 2500;
//				TargetControlParameters[6].PalletConfig.Motion.Acceleration	:= 20000;
//				StTargetExt_[6].SetPalletMotionPar	:= StTargetExt_[6].PalletPresent AND StTargetExt_[6].ReleaseToTarget = FALSE;
//				IF EDGEPOS(StTargetExt_[6].CommandDone) THEN
//					StTargetExt_[6].SetPalletMotionPar	:= FALSE;
//					StateMode2.Station1					:= RELEASE_TO_OFFSET_MOD2_STAT1;
//				END_IF;
			
			RELEASE_TO_OFFSET_MOD2_STAT1:
				IF StTargetExt_[6].PalletPresent AND StTargetExt_[6].ReleaseToTarget = FALSE THEN
					TargetControlParameters[6].AdvancedReleaseConfig.DestinationTarget	:= 0;
					TargetControlParameters[6].AdvancedReleaseConfig.TargetOffsetIdx	:= 1;
					TargetControlParameters[6].AdvancedReleaseConfig.Direction			:= stCOM_DIR_LEFT;
					StTargetExt_[6].ReleaseToTarget	:= TRUE;
					StateMode2.Station1				:= SEND_TO_TARGET_MOD2_STAT1;
				END_IF;
			
			SEND_TO_TARGET_MOD2_STAT1:
				IF StTargetExt_[6].PalletPresent AND StTargetExt_[6].ReleaseToTarget = FALSE THEN
					TargetControlParameters[6].AdvancedReleaseConfig.DestinationTarget	:= 7;
					TargetControlParameters[6].AdvancedReleaseConfig.TargetOffsetIdx	:= 0;
					TargetControlParameters[6].AdvancedReleaseConfig.Direction			:= stCOM_DIR_RIGHT;
					StTargetExt_[6].ReleaseToTarget	:= TRUE;
					IF CounterMode2.Station1 = 2 THEN
						StateMode2.Station1				:= FINISH_TARGET_MOD2_STAT1;
						CounterMode2.Station1			:= 0;
					ELSE
						StateMode2.Station1				:= RELEASE_TO_OFFSET_MOD2_STAT1;
						CounterMode2.Station1			:= CounterMode2.Station1 + 1;
					END_IF;
				END_IF;
			
			FINISH_TARGET_MOD2_STAT1:
				IF StTargetExt_[6].PalletPresent AND StTargetExt_[6].ReleaseToTarget = FALSE THEN
					TargetControlParameters[6].AdvancedReleaseConfig.DestinationTarget	:= 8;
					TargetControlParameters[6].AdvancedReleaseConfig.TargetOffsetIdx	:= 0;
					TargetControlParameters[6].AdvancedReleaseConfig.Direction			:= stCOM_DIR_RIGHT;
					StTargetExt_[6].ReleaseToTarget	:= TRUE;
					StateMode2.Station1				:= RELEASE_TO_OFFSET_MOD2_STAT1;
				END_IF;

		END_CASE;
		
		CASE StateMode2.Station2 OF
//			SET_PARAMETER_MOD2_STAT2:
//				TargetControlParameters[7].PalletConfig.Motion.Velocity		:= 500;
//				TargetControlParameters[7].PalletConfig.Motion.Acceleration	:= 20000;
//				StTargetExt_[7].SetPalletMotionPar	:= StTargetExt_[7].PalletPresent AND StTargetExt_[7].ReleaseToTarget = FALSE;
//				IF EDGEPOS(StTargetExt_[7].CommandDone) THEN
//					StTargetExt_[7].SetPalletMotionPar	:= FALSE;
//					StateMode2.Station2					:= FINISH_TARGET_MOD2_STAT2;
//				END_IF;
			
			FINISH_TARGET_MOD2_STAT2:
				IF StTargetExt_[7].PalletPresent AND StTargetExt_[7].ReleaseToTarget = FALSE THEN
					TargetControlParameters[7].AdvancedReleaseConfig.DestinationTarget	:= 9;
					TargetControlParameters[7].AdvancedReleaseConfig.TargetOffsetIdx	:= 0;
					TargetControlParameters[7].AdvancedReleaseConfig.Direction			:= stCOM_DIR_RIGHT;
					StTargetExt_[7].ReleaseToTarget	:= TRUE;
				END_IF;
				IF StTargetExt_[7].PalletPresent = FALSE AND StTargetExt_[7].ReleaseToTarget THEN
					StateMode2.Station2				:= FINISH_TARGET_MOD2_STAT2;
				END_IF;

		END_CASE;
		
		CASE StateMode2.Station3 OF
//			SET_PARAMETER_MOD2_STAT3:
//				TargetControlParameters[8].PalletConfig.Motion.Velocity		:= 2000;
//				TargetControlParameters[8].PalletConfig.Motion.Acceleration	:= 5000;
//				StTargetExt_[8].SetPalletMotionPar	:= StTargetExt_[8].PalletPresent AND StTargetExt_[8].ReleaseToTarget = FALSE;
//				IF EDGEPOS(StTargetExt_[8].CommandDone) THEN
//					StTargetExt_[8].SetPalletMotionPar	:= FALSE;
//					StateMode2.Station3					:= RELEASE_TO_OFFSET_MOD2_STAT3;
//				END_IF;
			
			RELEASE_TO_OFFSET_MOD2_STAT3:
				IF StTargetExt_[8].PalletPresent AND StTargetExt_[8].ReleaseToTarget = FALSE THEN
					TargetControlParameters[8].AdvancedReleaseConfig.DestinationTarget	:= 0;
					TargetControlParameters[8].AdvancedReleaseConfig.TargetOffsetIdx	:= 2;
					TargetControlParameters[8].AdvancedReleaseConfig.Direction			:= stCOM_DIR_RIGHT;
					StTargetExt_[8].ReleaseToTarget	:= TRUE;
					StateMode2.Station3				:= SEND_TO_TARGET_MOD2_STAT3;
				END_IF;
			
			SEND_TO_TARGET_MOD2_STAT3:
				IF StTargetExt_[8].PalletPresent AND StTargetExt_[8].ReleaseToTarget = FALSE THEN
					TargetControlParameters[8].AdvancedReleaseConfig.DestinationTarget	:= 9;
					TargetControlParameters[8].AdvancedReleaseConfig.TargetOffsetIdx	:= 0;
					TargetControlParameters[8].AdvancedReleaseConfig.Direction			:= stCOM_DIR_LEFT;
					StTargetExt_[8].ReleaseToTarget	:= TRUE;
					IF CounterMode2.Station3 = 2 THEN
						StateMode2.Station3				:= FINISH_TARGET_MOD2_STAT3;
						CounterMode2.Station3			:= 0;
					ELSE
						StateMode2.Station3				:= RELEASE_TO_OFFSET_MOD2_STAT3;
						CounterMode2.Station3			:= CounterMode2.Station3 + 1;
					END_IF;
				END_IF;
			
			FINISH_TARGET_MOD2_STAT3:
				IF StTargetExt_[8].PalletPresent AND StTargetExt_[8].ReleaseToTarget = FALSE THEN
					TargetControlParameters[8].AdvancedReleaseConfig.DestinationTarget	:= 7;
					TargetControlParameters[8].AdvancedReleaseConfig.TargetOffsetIdx	:= 0;
					TargetControlParameters[8].AdvancedReleaseConfig.Direction			:= stCOM_DIR_RIGHT;
					StTargetExt_[8].ReleaseToTarget	:= TRUE;
					StateMode2.Station3				:= RELEASE_TO_OFFSET_MOD2_STAT3;
				END_IF;
			

		END_CASE;
		
		CASE StateMode2.Station4 OF
			WAIT_STATION4:
			

		END_CASE;
		
		CASE StateMode2.Station5 OF
			WAIT_STATION5:
			

		END_CASE;
		
		FOR Index := 0 TO (SIZEOF(StTargetExt_)/SIZEOF(StTargetExt_[0])) - 1 DO
			IF StTargetExt_[Index].PalletPresent = FALSE THEN
				StTargetExt_[Index].ReleaseToTarget := FALSE;
			END_IF;
		END_FOR;
		
		// Set Status
		SuperTrakControl.Status.Mode2		:= TRUE;
	END_IF	
	
	// Stop pallet-control after user event
	IF StopMode THEN
		cmd_StartMode2 	:= FALSE;
		cmd_StopMode2	:= FALSE;
		StopMode		:= FALSE;
		ParameterSet	:= FALSE;
		CounterMode2.Station1				:= 0;
		CounterMode2.Station3				:= 0;
		SuperTrakControl.Status.Mode2		:= FALSE;
		ActualState							:= MODE_STOPPING;
	END_IF	
	
END_ACTION
