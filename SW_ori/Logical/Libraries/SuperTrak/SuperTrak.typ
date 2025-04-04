(*
Copyright ATS Automation Tooling Systems, Inc. 2015-2018
All rights reserved.
*)
(*
=== begin SuperTrak standard items ===
*)
(*Control interface structures*)

TYPE
	SuperTrakControlInterface_t : 	STRUCT  (*Data for the SuperTrakProcessControl function*)
		pControl : UDINT; (*Pointer to control data buffer (typically a structure or byte array)*)
		pStatus : UDINT; (*Pointer to status data buffer (typically a structure or byte array)*)
		controlSize : UINT; (*Size of control data buffer, in bytes*)
		statusSize : UINT; (*Size of status data buffer, in bytes*)
		controlUsed : UINT; (*Number of control data bytes in use*)
		statusUsed : UINT; (*Number of status data bytes in use*)
	END_STRUCT;
	SuperTrakSystemControl_t : 	STRUCT  (*System Control portion of a control interface*)
		control : UINT; (*System control bits*)
		reserved : UINT; (*Not used; should always be zero*)
	END_STRUCT;
	SuperTrakSectionControl_t : 	STRUCT  (*Section Control portion of a control interface*)
		control : USINT; (*Section control bits*)
	END_STRUCT;
	SuperTrakCommand_t : 	STRUCT  (*Command Buffer portion of a control interface*)
		u1 : ARRAY[0..7]OF USINT; (*Command data*)
	END_STRUCT;
	SuperTrakSystemStatus_t : 	STRUCT  (*System Status portion of a control interface*)
		status : UINT; (*System status bits*)
		totalPallets : UINT; (*Not used; should always be zero*)
	END_STRUCT;
	SuperTrakSectionStatus_t : 	STRUCT  (*Section Status portion of a control interface*)
		status : USINT; (*Section status bits*)
	END_STRUCT;
	SuperTrakTargetStatus_t : 	STRUCT  (*Target Status portion of a control interface*)
		status : USINT; (*Target status bits*)
		palletID : USINT; (*Pallet ID for the pallet at the target*)
		offsetIndex : USINT; (*Current offset map index for the pallet at the target*)
	END_STRUCT;
	ServiceChannel_t : 	STRUCT  (*Data for the SuperTrakServiceChannel function*)
		channelId : USINT; (*Uniquely identifies this service channel instance*)
		state : USINT; (*Indicates the current state of this service channel*)
		requestSequence : USINT; (*Tracks the most recent request sequence number*)
		reserved0 : USINT; (*Not used; should always be zero*)
		reserved1 : UINT; (*Not used; should always be zero*)
		timer : UINT; (*Used to implement a timeout mechanism for requests that must be processed asynchronously*)
		pRequestHeader : REFERENCE TO ServiceChannelHeader_t; (*Pointer to the request header*)
		pResponseHeader : REFERENCE TO ServiceChannelHeader_t; (*Pointer to the response header*)
		reserved4 : UDINT; (*Not used; should always be zero*)
		requestBufferSize : UINT; (*Size of the pRequestValues buffer, in bytes*)
		responseBufferSize : UINT; (*Size of the pResponseValues buffer, in bytes*)
		pRequestValues : UDINT; (*Pointer to the request values, or zero if not applicable*)
		pResponseValues : UDINT; (*Pointer to the response values, or zero if not applicable*)
	END_STRUCT;
	ServiceChannelHeader_t : 	STRUCT  (*Header structure for service channel requests and responses*)
		length : UINT; (*Total length of the request or response, including this header.*)
		sequence : USINT; (*The requestor normally increments this number, for each request. The value is echoed in the reply.*)
		task : USINT; (*In requests, one of the scTASK constants. In responses, one of the scERR constants.*)
		param : UINT; (*Specifies which parameter is being addressed.*)
		section : USINT; (*Specifies which section is being addressed, or zero to address the system.*)
		reserved0 : USINT; (*Not used; should always be zero*)
		startIndex : UDINT; (*Specifies the starting index for the parameter that is being addressed.*)
		reserved1 : UINT; (*Not used; should always be zero*)
		count : UINT; (*Specifies the number of data elements to be transferred.*)
	END_STRUCT;
END_TYPE

(*Command structures*)

TYPE
	StCmdReleasePallet_t : 	STRUCT  (*Data for commands 16 to 19*)
		command : USINT; (*values 16 through 19*)
		context : USINT; (*current target for commands 16/17; pallet ID for commands 18/19*)
		destTarget : USINT; (*0 = none*)
		moveConfig : USINT; (*0 = none; 1 - 240 global; 241 - 243 local*)
		targetOffset : USINT; (*index in offset table; 0 = none*)
		reserved5 : USINT; (*specify 0*)
		incrementalOffset : UINT; (*in microns*)
	END_STRUCT;
	StCmdReleaseTargetOffset_t : 	STRUCT  (*Data for commands 24 to 27*)
		command : USINT; (*values 24 through 27*)
		context : USINT; (*current target for commands 24/25; pallet ID for commands 26/27*)
		destTarget : USINT; (*0 = none*)
		moveConfig : USINT; (*0 = none; 1 - 240 global; 241 - 243 local*)
		offset : DINT; (*offset relative to target, in microns*)
	END_STRUCT;
	StCmdReleaseIncrementalOffset_t : 	STRUCT  (*Data for commands 28 to 31*)
		command : USINT; (*values 28 through 31*)
		context : USINT; (*current target for commands 28/29; pallet ID for commands 30/31*)
		destTarget : USINT; (*0 = none*)
		moveConfig : USINT; (*0 = none; 1 - 240 global; 241 - 243 local*)
		offset : DINT; (*incremental offset, in microns*)
	END_STRUCT;
	StCmdContinueMove_t : 	STRUCT  (*Data for commands 60 and 62*)
		command : USINT; (*values 60 and 62*)
		context : USINT; (*current target for command 60; pallet ID for command 62*)
		reserved2to3 : UINT; (*specify 0*)
		reserved4to7 : UDINT; (*specify 0*)
	END_STRUCT;
	StCmdSetPalletID_t : 	STRUCT  (*Data for command 64*)
		command : USINT; (*value 64*)
		target : USINT; (*current target*)
		palletID : USINT; (*pallet ID to assign*)
		reserved3 : USINT; (*specify 0*)
		reserved4to7 : UDINT; (*specify 0*)
	END_STRUCT;
	StCmdSetVelocityAccel_t : 	STRUCT  (*Data for commands 68 and 70*)
		command : USINT; (*values 68 and 70*)
		context : USINT; (*current target for command 68; pallet ID for command 70*)
		velocity : UINT; (*commanded velocity, in mm/s; 0 = no change*)
		acceleration : UINT; (*commanded acceleration, in m/s^2; 0 = no change*)
		reserved6to7 : UINT; (*specify 0*)
	END_STRUCT;
	StCmdSetPalletWidth_t : 	STRUCT  (*Data for commands 72 and 74*)
		command : USINT; (*values 72 and 74*)
		context : USINT; (*current target for command 72; pallet ID for command 74*)
		shelfWidth : UINT; (*in units of 0.1mm*)
		shelfOffset : UINT; (*in units of 0.1mm*)
		reserved6to7 : UINT; (*specify 0*)
	END_STRUCT;
	StCmdSetPalletControlParams_t : 	STRUCT  (*Data for commands 76 and 78*)
		command : USINT; (*values 76 and 78*)
		context : USINT; (*current target for command 76; pallet ID for command 78*)
		controlGainSet : USINT; (*0 to 15*)
		movingFilterPercent : USINT;
		stationaryFilterPercent : USINT;
		reserved5 : USINT; (*specify 0*)
		reserved6to7 : UINT; (*specify 0*)
	END_STRUCT;
	StCmdAntiSlosh_t : 	STRUCT  (*Data for commands 80 and 82*)
		command : USINT; (*values 80 and 82*)
		context : USINT; (*current target for command 80; pallet ID for command 82*)
		containerShape : USINT; (*0 = disable, 1 = rectangle, 2 = cylinder*)
		oscillationModes : USINT; (*0 = first, 1 = 1st and 2nd, 2 = 1st, 2nd, and 3rd*)
		containerLength : UINT; (*millimetres*)
		fillLevel : UINT; (*millimetres*)
	END_STRUCT;
END_TYPE

(*Miscellaneous structures*)

TYPE
	SuperTrakIpConfig_t : 	STRUCT  (*Data for the SuperTrakGetSlaveIpConfig function*)
		mode : USINT; (*The method of address assignment, using the stIP_ADDR_MODE constants.*)
		reserved1 : USINT; (*Not used; should always be zero*)
		reserved2 : UINT; (*Not used; should always be zero*)
		address : UDINT; (*Network address*)
		networkMask : UDINT; (*Sub-network mask*)
		gateway : UDINT; (*Default gateway address*)
	END_STRUCT;
	SuperTrakPalletInfo_t : 	STRUCT  (*Data for the SuperTrakGetPalletInfo function*)
		palletID : USINT; (*Pallet ID number assigned to the pallet*)
		status : USINT; (*Pallet status bits*)
		controlMode : USINT; (*Pallet control mode*)
		section : USINT; (*Section number where the pallet is currently located*)
		position : DINT; (*Current pallet position, in microns*)
	END_STRUCT;
END_TYPE

(*
=== end SuperTrak standard items ===
*)
