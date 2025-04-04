
(*****************************************************************************
 * Copyright: COPYRIGHT (C) BERNECKER + RAINER, AUSTRIA
 *****************************************************************************
 * Author:  B+R  Created:  June 21, 2017/11:05 AM
 *****************************************************************************
 * Description: Implementation of the SDC-Axis
 ******************************************************************************)
PROGRAM _INIT
	
	// Initialize the function block
	gMpAxisBasic_0.Enable 				:= TRUE;
	gMpAxisBasic_0.Axis	  				:= ADR(gAxisSDC);
	gMpAxisBasic_0.MpLink 				:= ADR(gAxisBasic);
	gMpAxisBasic_0.Parameters			:= ADR(gMpAxisBasicParam);
	
	gMpAxisBasicParam.Velocity			:= 2500;
	gMpAxisBasicParam.Acceleration		:= 40000;
	gMpAxisBasicParam.Deceleration		:= 40000;
	
	gMpAxisBasicParam.Jog.LowerLimit	:= 180;
	gMpAxisBasicParam.Jog.UpperLimit	:= 3500;
	
	Max_Velocity						:= 100;
	Max_Acceleration					:= 10;
	
END_PROGRAM

PROGRAM _CYCLIC
	// Home the axis if the SuperTrak-Sections is enabled
	IF gAllSectionsEnabled THEN
		gMpAxisBasic_0.Power 			:= TRUE;
	END_IF
	// Home the axis if its power on
	IF gMpAxisBasic_0.PowerOn AND NOT(gMpAxisBasic_0.IsHomed) THEN
		gMpAxisBasic_0.Home 			:= TRUE;
	END_IF
	// Reset the Input if the homing is done
	IF EDGEPOS(gMpAxisBasic_0.IsHomed) THEN
		gMpAxisBasic_0.Home				:= FALSE;
	END_IF
	
	gMpAxisBasicParam.Jog.Velocity		:= Max_Velocity;			// mm/s
	gMpAxisBasicParam.Jog.Acceleration	:= Max_Acceleration*1000;	// m/s² * 1000 --> mm/s²
	gMpAxisBasicParam.Jog.Deceleration	:= Max_Acceleration*1000;	// m/s² * 1000 --> mm/s²
	
	//Call of the function block
	gMpAxisBasic_0(); 
	
END_PROGRAM

PROGRAM _EXIT
	
	gMpAxisBasic_0.Enable				:= FALSE;
	gMpAxisBasic_0();
	 
END_PROGRAM

