
(*****************************************************************************
 * Copyright: COPYRIGHT (C) BERNECKER + RAINER, AUSTRIA
 *****************************************************************************
 * Author:  B+R  Created:  June 21, 2017/10:34 AM
 *****************************************************************************
 * Description: Implementation of a Pallet-Control
 ******************************************************************************)
ACTION Mode3: 

	IF cmd_StartMode3 THEN
		
		Status		:= '$$Page.StatusMode3Active';
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
		
		TargetControlParameters[0].AdvancedReleaseConfig.DestinationTarget	:= 11 + Counter;
		TargetControlParameters[0].AdvancedReleaseConfig.Direction			:= stCOM_DIR_RIGHT;
		StTargetExt_[0].ReleaseToTarget	:= StTargetExt_[0].PalletPresent AND ParameterSet;
		IF EDGEPOS(StTargetExt_[0].CommandDone) THEN
			Counter	:= Counter + 1;
		END_IF;
		
		IF Counter = 4 THEN
			TargetControlParameters[10].AdvancedReleaseConfig.DestinationTarget	:= 8;
			TargetControlParameters[10].AdvancedReleaseConfig.Direction			:= stCOM_DIR_RIGHT;
			TargetControlParameters[11].AdvancedReleaseConfig.DestinationTarget	:= 6;
			TargetControlParameters[11].AdvancedReleaseConfig.Direction			:= stCOM_DIR_RIGHT;
			TargetControlParameters[12].AdvancedReleaseConfig.DestinationTarget	:= 6;
			TargetControlParameters[12].AdvancedReleaseConfig.Direction			:= stCOM_DIR_RIGHT;
			TargetControlParameters[13].AdvancedReleaseConfig.DestinationTarget	:= 8;
			TargetControlParameters[13].AdvancedReleaseConfig.Direction			:= stCOM_DIR_RIGHT;
			
			IF StTargetExt_[10].PalletPresent AND StTargetExt_[11].PalletPresent AND StTargetExt_[12].PalletPresent AND StTargetExt_[13].PalletPresent THEN
				StTargetExt_[10].ReleaseToTarget	:= TRUE;
				StTargetExt_[11].ReleaseToTarget	:= TRUE;
				StTargetExt_[12].ReleaseToTarget	:= TRUE;
				StTargetExt_[13].ReleaseToTarget	:= TRUE;
			END_IF;
			
			IF StTargetExt_[10].CommandDone AND StTargetExt_[11].CommandDone AND StTargetExt_[12].CommandDone AND StTargetExt_[13].CommandDone THEN
				ShuttleReady						:= TRUE;
				StTargetExt_[10].ReleaseToTarget	:= FALSE;
				StTargetExt_[11].ReleaseToTarget	:= FALSE;
				StTargetExt_[12].ReleaseToTarget	:= FALSE;
				StTargetExt_[13].ReleaseToTarget	:= FALSE;
			END_IF;
		END_IF;
		
		IF ShuttleReady THEN
			FOR Index := 0 TO CONFIG_USED_SHUTTLES_MINUS_ONE DO
				IF ShuttlePosition[Index].section = 2 AND ShuttlePosition[Index].position > 0 THEN
					PalletControlParameters[Index].AdvancedReleaseConfig.DestinationTarget	:= 6;
					PalletControlParameters[Index].AdvancedReleaseConfig.Direction			:= stCOM_DIR_RIGHT;
					StPallet_[ShuttlePosition[Index].palletID - 1].ReleaseToTarget			:= TRUE;
				ELSIF StPallet_[ShuttlePosition[Index].palletID - 1].CommandDone THEN
					StPallet_[ShuttlePosition[Index].palletID - 1].ReleaseToTarget			:= FALSE;
				END_IF;
				
				IF ShuttlePosition[Index].section = 4 AND ShuttlePosition[Index].position > 100000 AND ShuttlePosition[Index].position < 200000 THEN
					PalletControlParameters[Index].AdvancedReleaseConfig.DestinationTarget	:= 8;
					PalletControlParameters[Index].AdvancedReleaseConfig.Direction			:= stCOM_DIR_RIGHT;
					StPallet_[ShuttlePosition[Index].palletID - 1].ReleaseToTarget			:= TRUE;
				ELSIF StPallet_[ShuttlePosition[Index].palletID - 1].CommandDone THEN
					StPallet_[ShuttlePosition[Index].palletID - 1].ReleaseToTarget			:= FALSE;
				END_IF;
			END_FOR;
		END_IF;
		
		// Set Status
		SuperTrakControl.Status.Mode3		:= TRUE;
	END_IF	
	
	// Stop pallet-control after user event
	IF StopMode THEN
		cmd_StartMode3 	:= FALSE;
		cmd_StopMode3	:= FALSE;
		StopMode		:= FALSE;
		ShuttleReady	:= FALSE;
		Counter			:= 0;
		SuperTrakControl.Status.Mode3		:= FALSE;
		ParameterSet						:= FALSE;
		ActualState							:= MODE_STOPPING;
	END_IF	
	
END_ACTION
