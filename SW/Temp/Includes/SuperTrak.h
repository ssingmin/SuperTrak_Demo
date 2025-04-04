/* Automation Studio generated header file */
/* Do not edit ! */
/* SuperTrak 0.06.2 */

#ifndef _SUPERTRAK_
#define _SUPERTRAK_
#ifdef __cplusplus
extern "C" 
{
#endif
#ifndef _SuperTrak_VERSION
#define _SuperTrak_VERSION 0.06.2
#endif

#include <bur/plctypes.h>

#ifndef _BUR_PUBLIC
#define _BUR_PUBLIC
#endif
/* Constants */
#ifdef _REPLACE_CONST
 #define stMAX_CONTROL_IF_COUNT 4U
 #define stMAX_CONTROL_IF_INDEX 3U
 #define stTARGET_PALLET_PRESENT 1U
 #define stTARGET_PALLET_IN_POSITION 2U
 #define stTARGET_PALLET_PRE_ARRIVAL 4U
 #define stTARGET_PALLET_OVER_TARGET 8U
 #define stTARGET_RELEASE_ERROR 128U
 #define scTASK_ARRAY_READ 5U
 #define scTASK_ARRAY_WRITE 6U
 #define scERR_SUCCESS 0U
 #define scERR_INVALID_SECTION 1U
 #define scERR_INVALID_PARAM 2U
 #define scERR_INVALID_TASK 3U
 #define scERR_TASK_UNAVAILABLE 4U
 #define scERR_INVALID_INDEX 6U
 #define scERR_INVALID_VALUE 7U
 #define scERR_INVALID_COUNT 8U
 #define scERR_COMMAND_TIMEOUT 10U
 #define scERR_UNAUTHORIZED 11U
 #define scERR_INVALID_PACKET 14U
 #define scERR_INTERNAL_ERROR 15U
 #define scSTATE_RECV 0U
 #define scSTATE_EXEC 1U
 #define scSTATE_WAIT 2U
 #define scSTATE_SEND 3U
 #define scSTATE_ERROR 9U
 #define scTIMER_ABORT 65535U
 #define stIP_ADDR_MODE_NONE 0U
 #define stIP_ADDR_MODE_MANUAL 1U
 #define stIP_ADDR_MODE_DHCP 2U
 #define stIP_ADDR_MODE_BOOTP 3U
 #define stPALLET_ALLOCATED 1U
 #define stPALLET_RECOVERING 2U
 #define stPALLET_AT_TARGET 4U
 #define stPALLET_IN_POSITION 8U
 #define stPALLET_SERVO_ENABLED 16U
 #define stPALLET_INITIALIZING 32U
 #define stPALLET_LOST 64U
 #define stPALLET_RESERVED_7 128U
 #define stPALLET_MODE_TRAJECTORY 0U
 #define stPALLET_MODE_CNC 1U
 #define stPALLET_MODE_CAM 2U
 #define stPALLET_MODE_EXTERNAL 3U
 #define stWARN_EPL_NOT_OK 1U
 #define stWARN_EPL_LINK_DOWN 2U
 #define stWARN_BC_NOT_OK 4U
 #define stWARN_PS_NOT_OK 8U
 #define stWARN_PLC_LINK_DOWN 16U
 #define stWARN_PLC_IF_ERROR 32U
 #define stWARN_IO_NOT_OK 256U
 #define stWARN_IO_ERROR 512U
#else
 #ifndef _GLOBAL_CONST
   #define _GLOBAL_CONST _WEAK const
 #endif
 _GLOBAL_CONST unsigned char stMAX_CONTROL_IF_COUNT;
 _GLOBAL_CONST unsigned char stMAX_CONTROL_IF_INDEX;
 _GLOBAL_CONST unsigned short stTARGET_PALLET_PRESENT;
 _GLOBAL_CONST unsigned short stTARGET_PALLET_IN_POSITION;
 _GLOBAL_CONST unsigned short stTARGET_PALLET_PRE_ARRIVAL;
 _GLOBAL_CONST unsigned short stTARGET_PALLET_OVER_TARGET;
 _GLOBAL_CONST unsigned short stTARGET_RELEASE_ERROR;
 _GLOBAL_CONST unsigned char scTASK_ARRAY_READ;
 _GLOBAL_CONST unsigned char scTASK_ARRAY_WRITE;
 _GLOBAL_CONST unsigned short scERR_SUCCESS;
 _GLOBAL_CONST unsigned short scERR_INVALID_SECTION;
 _GLOBAL_CONST unsigned short scERR_INVALID_PARAM;
 _GLOBAL_CONST unsigned short scERR_INVALID_TASK;
 _GLOBAL_CONST unsigned short scERR_TASK_UNAVAILABLE;
 _GLOBAL_CONST unsigned short scERR_INVALID_INDEX;
 _GLOBAL_CONST unsigned short scERR_INVALID_VALUE;
 _GLOBAL_CONST unsigned short scERR_INVALID_COUNT;
 _GLOBAL_CONST unsigned short scERR_COMMAND_TIMEOUT;
 _GLOBAL_CONST unsigned short scERR_UNAUTHORIZED;
 _GLOBAL_CONST unsigned short scERR_INVALID_PACKET;
 _GLOBAL_CONST unsigned short scERR_INTERNAL_ERROR;
 _GLOBAL_CONST unsigned char scSTATE_RECV;
 _GLOBAL_CONST unsigned char scSTATE_EXEC;
 _GLOBAL_CONST unsigned char scSTATE_WAIT;
 _GLOBAL_CONST unsigned char scSTATE_SEND;
 _GLOBAL_CONST unsigned char scSTATE_ERROR;
 _GLOBAL_CONST unsigned short scTIMER_ABORT;
 _GLOBAL_CONST unsigned char stIP_ADDR_MODE_NONE;
 _GLOBAL_CONST unsigned char stIP_ADDR_MODE_MANUAL;
 _GLOBAL_CONST unsigned char stIP_ADDR_MODE_DHCP;
 _GLOBAL_CONST unsigned char stIP_ADDR_MODE_BOOTP;
 _GLOBAL_CONST unsigned char stPALLET_ALLOCATED;
 _GLOBAL_CONST unsigned char stPALLET_RECOVERING;
 _GLOBAL_CONST unsigned char stPALLET_AT_TARGET;
 _GLOBAL_CONST unsigned char stPALLET_IN_POSITION;
 _GLOBAL_CONST unsigned char stPALLET_SERVO_ENABLED;
 _GLOBAL_CONST unsigned char stPALLET_INITIALIZING;
 _GLOBAL_CONST unsigned char stPALLET_LOST;
 _GLOBAL_CONST unsigned char stPALLET_RESERVED_7;
 _GLOBAL_CONST unsigned char stPALLET_MODE_TRAJECTORY;
 _GLOBAL_CONST unsigned char stPALLET_MODE_CNC;
 _GLOBAL_CONST unsigned char stPALLET_MODE_CAM;
 _GLOBAL_CONST unsigned char stPALLET_MODE_EXTERNAL;
 _GLOBAL_CONST unsigned long stWARN_EPL_NOT_OK;
 _GLOBAL_CONST unsigned long stWARN_EPL_LINK_DOWN;
 _GLOBAL_CONST unsigned long stWARN_BC_NOT_OK;
 _GLOBAL_CONST unsigned long stWARN_PS_NOT_OK;
 _GLOBAL_CONST unsigned long stWARN_PLC_LINK_DOWN;
 _GLOBAL_CONST unsigned long stWARN_PLC_IF_ERROR;
 _GLOBAL_CONST unsigned long stWARN_IO_NOT_OK;
 _GLOBAL_CONST unsigned long stWARN_IO_ERROR;
#endif




/* Datatypes and datatypes of function blocks */
typedef struct SuperTrakControlInterface_t
{	unsigned long pControl;
	unsigned long pStatus;
	unsigned short controlSize;
	unsigned short statusSize;
	unsigned short controlUsed;
	unsigned short statusUsed;
} SuperTrakControlInterface_t;

typedef struct SuperTrakSystemControl_t
{	unsigned short control;
	unsigned short reserved;
} SuperTrakSystemControl_t;

typedef struct SuperTrakSectionControl_t
{	unsigned char control;
} SuperTrakSectionControl_t;

typedef struct SuperTrakCommand_t
{	unsigned char u1[8];
} SuperTrakCommand_t;

typedef struct SuperTrakSystemStatus_t
{	unsigned short status;
	unsigned short totalPallets;
} SuperTrakSystemStatus_t;

typedef struct SuperTrakSectionStatus_t
{	unsigned char status;
} SuperTrakSectionStatus_t;

typedef struct SuperTrakTargetStatus_t
{	unsigned char status;
	unsigned char palletID;
	unsigned char offsetIndex;
} SuperTrakTargetStatus_t;

typedef struct ServiceChannelHeader_t
{	unsigned short length;
	unsigned char sequence;
	unsigned char task;
	unsigned short param;
	unsigned char section;
	unsigned char reserved0;
	unsigned long startIndex;
	unsigned short reserved1;
	unsigned short count;
} ServiceChannelHeader_t;

typedef struct ServiceChannel_t
{	unsigned char channelId;
	unsigned char state;
	unsigned char requestSequence;
	unsigned char reserved0;
	unsigned short reserved1;
	unsigned short timer;
	struct ServiceChannelHeader_t* pRequestHeader;
	struct ServiceChannelHeader_t* pResponseHeader;
	unsigned long reserved4;
	unsigned short requestBufferSize;
	unsigned short responseBufferSize;
	unsigned long pRequestValues;
	unsigned long pResponseValues;
} ServiceChannel_t;

typedef struct StCmdReleasePallet_t
{	unsigned char command;
	unsigned char context;
	unsigned char destTarget;
	unsigned char moveConfig;
	unsigned char targetOffset;
	unsigned char reserved5;
	unsigned short incrementalOffset;
} StCmdReleasePallet_t;

typedef struct StCmdReleaseTargetOffset_t
{	unsigned char command;
	unsigned char context;
	unsigned char destTarget;
	unsigned char moveConfig;
	signed long offset;
} StCmdReleaseTargetOffset_t;

typedef struct StCmdReleaseIncrementalOffset_t
{	unsigned char command;
	unsigned char context;
	unsigned char destTarget;
	unsigned char moveConfig;
	signed long offset;
} StCmdReleaseIncrementalOffset_t;

typedef struct StCmdContinueMove_t
{	unsigned char command;
	unsigned char context;
	unsigned short reserved2to3;
	unsigned long reserved4to7;
} StCmdContinueMove_t;

typedef struct StCmdSetPalletID_t
{	unsigned char command;
	unsigned char target;
	unsigned char palletID;
	unsigned char reserved3;
	unsigned long reserved4to7;
} StCmdSetPalletID_t;

typedef struct StCmdSetVelocityAccel_t
{	unsigned char command;
	unsigned char context;
	unsigned short velocity;
	unsigned short acceleration;
	unsigned short reserved6to7;
} StCmdSetVelocityAccel_t;

typedef struct StCmdSetPalletWidth_t
{	unsigned char command;
	unsigned char context;
	unsigned short shelfWidth;
	unsigned short shelfOffset;
	unsigned short reserved6to7;
} StCmdSetPalletWidth_t;

typedef struct StCmdSetPalletControlParams_t
{	unsigned char command;
	unsigned char context;
	unsigned char controlGainSet;
	unsigned char movingFilterPercent;
	unsigned char stationaryFilterPercent;
	unsigned char reserved5;
	unsigned short reserved6to7;
} StCmdSetPalletControlParams_t;

typedef struct StCmdAntiSlosh_t
{	unsigned char command;
	unsigned char context;
	unsigned char containerShape;
	unsigned char oscillationModes;
	unsigned short containerLength;
	unsigned short fillLevel;
} StCmdAntiSlosh_t;

typedef struct SuperTrakIpConfig_t
{	unsigned char mode;
	unsigned char reserved1;
	unsigned short reserved2;
	unsigned long address;
	unsigned long networkMask;
	unsigned long gateway;
} SuperTrakIpConfig_t;

typedef struct SuperTrakPalletInfo_t
{	unsigned char palletID;
	unsigned char status;
	unsigned char controlMode;
	unsigned char section;
	signed long position;
} SuperTrakPalletInfo_t;



/* Prototyping of functions and function blocks */
_BUR_PUBLIC plcbit SuperTrakInit(plcbit simulation, plcstring* storagePath);
_BUR_PUBLIC plcbit SuperTrakCyclic(void);
_BUR_PUBLIC plcbit SuperTrakExit(void);
_BUR_PUBLIC plcbit SuperTrakGetSlaveIpConfig(unsigned char index, struct SuperTrakIpConfig_t* config);
_BUR_PUBLIC plcbit SuperTrakGetSlaveName(unsigned char index, plcstring* name);
_BUR_PUBLIC plcbit SuperTrakProcessControl(unsigned short index, struct SuperTrakControlInterface_t* data);
_BUR_PUBLIC plcbit SuperTrakServiceChannel(struct ServiceChannel_t* sc);
_BUR_PUBLIC unsigned short SuperTrakServChanRead(unsigned char section, unsigned short parameter, unsigned long startIndex, unsigned short count, unsigned long pBuffer, unsigned short bufferSize);
_BUR_PUBLIC unsigned short SuperTrakServChanWrite(unsigned char section, unsigned short parameter, unsigned long startIndex, unsigned short count, unsigned long pData, unsigned short dataLength);
_BUR_PUBLIC plcbit SuperTrakGateSectionEnable(plcbit enable, unsigned short firstSection, unsigned short lastSection);
_BUR_PUBLIC plcbit SuperTrakPositionTrigger(unsigned short index, signed long* timestamp, unsigned long* duration);
_BUR_PUBLIC plcbit SuperTrakCncBeginControl(unsigned short instance, unsigned short target);
_BUR_PUBLIC plcbit SuperTrakCncUpdateControl(unsigned short instance, signed long position, float acceleration);
_BUR_PUBLIC plcbit SuperTrakCncEndControl(unsigned short instance);
_BUR_PUBLIC plcbit SuperTrakGetPalletInfo(unsigned long palletInfo, unsigned char count, plcbit useSetpointPositions);
_BUR_PUBLIC plcbit SuperTrakBeginExternalControl(unsigned short palletID);
_BUR_PUBLIC plcbit SuperTrakPalletControl(unsigned short palletID, unsigned short setpointSection, signed long setpointPosition, signed short setpointVelocity, float setpointAccel);
_BUR_PUBLIC unsigned short SuperTrakApplicationWarning(unsigned char section, signed long detail0, signed long detail1, signed long detail2, signed long detail3);
_BUR_PUBLIC unsigned short SuperTrakSimCreatePallet(unsigned char tagID, unsigned short section, float position, float shelfWidth, float shelfOffset, float mass);
_BUR_PUBLIC plcbit SuperTrakSimDeletePallet(unsigned short hSimPallet);


#ifdef __cplusplus
};
#endif
#endif /* _SUPERTRAK_ */

