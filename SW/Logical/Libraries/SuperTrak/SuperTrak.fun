(*
Copyright ATS Automation Tooling Systems, Inc. 2015-2018
All rights reserved.
*)
(*
=== begin SuperTrak standard items ===
*)
(*SuperTrak Conveyor Controller implementation*)

FUNCTION SuperTrakInit : BOOL (*Called during INIT*)(*Not used*)
	VAR_INPUT
		simulation : BOOL; (*True for simulation, False for physical hardware*)
		storagePath : STRING[127]; (*Specifies the filesystem location for conveyor configuration data*)
	END_VAR
END_FUNCTION

FUNCTION SuperTrakCyclic : BOOL (*Called during CYCLIC*)(*Not used*)
END_FUNCTION

FUNCTION SuperTrakExit : BOOL (*Called during EXIT*)(*Not used*)
END_FUNCTION
(*Control interface functions*)

FUNCTION SuperTrakGetSlaveIpConfig : BOOL (*Get IPv4 settings for e.g. X20IF10D3-1*)(*True on success, False on failure*)
	VAR_INPUT
		index : USINT; (*Fieldbus interface index (0 - 3)*)
	END_VAR
	VAR_IN_OUT
		config : SuperTrakIpConfig_t; (*IPv4 address configuration*)
	END_VAR
END_FUNCTION

FUNCTION SuperTrakGetSlaveName : BOOL (*Get network name for e.g. X20IF10E3-1*)(*True on success, False on failure*)
	VAR_INPUT
		index : USINT; (*Fieldbus interface index (0 - 3)*)
	END_VAR
	VAR_IN_OUT
		name : STRING[32]; (*String buffer where the name will be stored*)
	END_VAR
END_FUNCTION

FUNCTION SuperTrakProcessControl : BOOL (*Process a control interface; normally called after SuperTrakCyclic*)(*True on success, False on failure*)
	VAR_INPUT
		index : UINT; (*Fieldbus interface index (0 - 3)*)
		data : SuperTrakControlInterface_t; (*Control interface data buffers*)
	END_VAR
END_FUNCTION

FUNCTION SuperTrakServiceChannel : BOOL (*Process a service channel interface*)(*True on success, False on failure*)
	VAR_IN_OUT
		sc : ServiceChannel_t; (*Service channel structure*)
	END_VAR
END_FUNCTION

FUNCTION SuperTrakServChanRead : UINT (*Reads data from the conveyor*)(*One of the scERR constants*)
	VAR_INPUT
		section : USINT; (*User-assigned section address, or 0 to access system parameters*)
		parameter : UINT; (*Parameter to read*)
		startIndex : UDINT; (*Index of first value to read*)
		count : UINT; (*Count of values to read*)
		pBuffer : UDINT; (*Buffer to accept values*)
		bufferSize : UINT; (*Size of the buffer, in bytes*)
	END_VAR
END_FUNCTION

FUNCTION SuperTrakServChanWrite : UINT (*Writes data to the conveyor*)(*One of the scERR constants*)
	VAR_INPUT
		section : USINT; (*User-assigned section address, or 0 to access system parameters*)
		parameter : UINT; (*Parameter to write*)
		startIndex : UDINT; (*Index of first value to write*)
		count : UINT; (*Count of values to write*)
		pData : UDINT; (*Data values to write*)
		dataLength : UINT; (*Size of data to write, in bytes*)
	END_VAR
END_FUNCTION
(*Input/Output*)

FUNCTION SuperTrakGateSectionEnable : BOOL (*Allow or disallow section enable, e.g. based on safety status*)(*Not used*)
	VAR_INPUT
		enable : BOOL; (*True to allow sections being enabled, False to disallow*)
		firstSection : UINT; (*User-assigned section number of the first section that is affected*)
		lastSection : UINT; (*User-assigned section number of the last section that is affected*)
	END_VAR
END_FUNCTION

FUNCTION SuperTrakPositionTrigger : BOOL (*Position trigger output*)(*True on success, False on failure*)
	VAR_INPUT
		index : UINT; (*Position trigger index, as shown in TrackMaster*)
	END_VAR
	VAR_IN_OUT
		timestamp : DINT; (*Time when the output should be activated*)
		duration : UDINT; (*Requested output pulse duration*)
	END_VAR
END_FUNCTION
(*CNC pallet control*)

FUNCTION SuperTrakCncBeginControl : BOOL (*Begin coordinated motion at a target*)(*True on success, False on failure*)
	VAR_INPUT
		instance : UINT; (*CNC instance index (0 - 3)*)
		target : UINT; (*Conveyor target where the pallet is stopped*)
	END_VAR
END_FUNCTION

FUNCTION SuperTrakCncUpdateControl : BOOL (*Update coordinated motion at a target*)(*True on success, False on failure*)
	VAR_INPUT
		instance : UINT; (*CNC instance index (0 - 3)*)
		position : DINT; (*Commanded position, in microns, relative to initial position; right is positive*)
		acceleration : REAL; (*Instantaneous commanded acceleration, in mm/s^2*)
	END_VAR
END_FUNCTION

FUNCTION SuperTrakCncEndControl : BOOL (*End coordinated motion at a target*)(*True on success, False on failure*)
	VAR_INPUT
		instance : UINT; (*CNC instance index (0 - 3)*)
	END_VAR
END_FUNCTION
(*Advanced pallet control*)

FUNCTION SuperTrakGetPalletInfo : BOOL (*Get pallet position information*)(*True on success, False on failure*)
	VAR_INPUT
		palletInfo : UDINT; (*Pointer to array of SuperTrakPalletInfo_t*)
		count : USINT; (*Size of pallet information array*)
		useSetpointPositions : BOOL; (*TRUE = return setpoint positions, FALSE = return actual positions*)
	END_VAR
END_FUNCTION

FUNCTION SuperTrakBeginExternalControl : BOOL (*Begin external control of a pallet*)(*True on success, False on failure*)
	VAR_INPUT
		palletID : UINT; (*Pallet ID of the affected pallet*)
	END_VAR
END_FUNCTION

FUNCTION SuperTrakPalletControl : BOOL (*Update external control of a pallet*)(*True on success, False on failure*)
	VAR_INPUT
		palletID : UINT; (*Pallet ID of the affected pallet*)
		setpointSection : UINT; (*User-assigned section where the pallet is commanded to be positioned*)
		setpointPosition : DINT; (*Commanded position on section, in microns*)
		setpointVelocity : INT; (*Instantaneous commanded velocity, in mm/s = um/ms; positive = right*)
		setpointAccel : REAL; (*Instantaneous commanded acceleration, in m/s^2 = um/ms^2; positive = right accel / left decel*)
	END_VAR
END_FUNCTION
(*Miscellaneous*)

FUNCTION SuperTrakApplicationWarning : UINT (*Records a conveyor warning*)(*Number of warning occurrences since warnings were last cleared*)
	VAR_INPUT
		section : USINT; (*Section where the warning applies, or 0 for a system warning*) (* *) (*#PAR*)
		detail0 : DINT; (*Detail values to be recorded*) (* *) (*#PAR*)
		detail1 : DINT; (*Detail values to be recorded*) (* *) (*#PAR*)
		detail2 : DINT; (*Detail values to be recorded*) (* *) (*#PAR*)
		detail3 : DINT; (*Detail values to be recorded*) (* *) (*#PAR*)
	END_VAR
END_FUNCTION
(*Simulation*)

FUNCTION SuperTrakSimCreatePallet : UINT (*Create a simulated pallet*)(*Handle value for the new simulated pallet*)
	VAR_INPUT
		tagID : USINT; (*IR tag serial number (may be zero if IR tags are not used)*)
		section : UINT; (*Section number where the pallet will be created*)
		position : REAL; (*Position on the section, in millimetres, where the pallet will be created*)
		shelfWidth : REAL; (*Shelf width, in millimetres*)
		shelfOffset : REAL; (*Shelf offset from center, in millimetres*)
		mass : REAL; (*Payload mass, in kilograms*)
	END_VAR
END_FUNCTION

FUNCTION SuperTrakSimDeletePallet : BOOL (*Remove a simulated pallet*)(*True on success, False on failure*)
	VAR_INPUT
		hSimPallet : UINT; (*Handle value for the simulated pallet to be removed*)
	END_VAR
END_FUNCTION
(*
=== end SuperTrak standard items ===
*)
