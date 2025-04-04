(************************************************************************************************************************************)
(************************************************************************************************************************************)
(*Structures for SuperTrak control*)

TYPE
	SuperTrakCtrlType : 	STRUCT  (*Control structure for SuperTrak*)
		Command : SuperTrakCtrlCmdType; (*SuperTrak commands*)
		Parameter : SuperTrakCtrlParType; (*SuperTrak parameters*)
		Status : SuperTrakCtrlStatType; (*SuperTrak status*)
	END_STRUCT;
	SuperTrakCtrlCmdType : 	STRUCT  (*Command strucutre for SuperTrak*)
		EnableAllSections : BOOL; (*Command to enable all sections on the system*)
	END_STRUCT;
	SuperTrakCtrlParType : 	STRUCT  (*Parameter structure for SuperTrak*)
		Reserved : BOOL; (*Reserved for future development*)
	END_STRUCT;
	SuperTrakCtrlStatType : 	STRUCT  (*Status strucutre for SuperTrak*)
		AllSectionsEnabled : BOOL; (*Indicating if all sections on the system are enabled*)
		AllSectionsDisabled : BOOL; (*Indicating if all sections on the system are disabled*)
		CommandBusy : BOOL; (*SuperTrak busy*)
		TrackingEnabled : BOOL; (*Tracking fuction active*)
		Mode1 : BOOL; (*Shuttle control active*)
		Mode2 : BOOL; (*Shuttle control active*)
		Mode3 : BOOL; (*Shuttle control active*)
		Standstill : BOOL; (*All shuttles in standstill*)
	END_STRUCT;
	StateMode2Type : 	STRUCT 
		Station1 : Mode2Station1Enum;
		Station2 : Mode2Station2Enum;
		Station3 : Mode2Station3Enum;
		Station4 : Mode2Station4Enum;
		Station5 : Mode2Station5Enum;
	END_STRUCT;
	Mode2Station1Enum : 
		(
		RELEASE_TO_OFFSET_MOD2_STAT1 := 0,
		SEND_TO_TARGET_MOD2_STAT1 := 10,
		FINISH_TARGET_MOD2_STAT1 := 15
		);
	Mode2Station2Enum : 
		(
		FINISH_TARGET_MOD2_STAT2 := 0
		);
	Mode2Station3Enum : 
		(
		RELEASE_TO_OFFSET_MOD2_STAT3 := 0,
		SEND_TO_TARGET_MOD2_STAT3 := 10,
		FINISH_TARGET_MOD2_STAT3 := 15
		);
	Mode2Station4Enum : 
		(
		WAIT_STATION4 := 0
		);
	Mode2Station5Enum : 
		(
		WAIT_STATION5 := 0
		);
	CounterMode2Type : 	STRUCT 
		Station1 : USINT;
		Station2 : USINT;
		Station3 : USINT;
		Station4 : USINT;
		Station5 : USINT;
	END_STRUCT;
	ShuttlePositionType : 	STRUCT  (*Actual position of the shuttle on the SuperTrak*)
		Position : DINT; (*Actual position*)
		Section : USINT; (*Actual section*)
		PositionOld : DINT; (*Position one cycle ago*)
	END_STRUCT;
	State_enum : 
		(
		POWER_OFF := 0,
		POWER_ON := 10,
		RECOVERING := 20,
		MODE_1 := 30,
		MODE_2 := 40,
		MODE_3 := 50,
		EXPERT_MODE := 55,
		MODE_STOPPING := 60,
		ERROR := 255
		);
END_TYPE
