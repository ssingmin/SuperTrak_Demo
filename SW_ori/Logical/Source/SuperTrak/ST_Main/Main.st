(*********************************************************************************
 * Copyright: ATS Automation Tooling Systems, Inc. 2015
 *     All rights reserved.
 *********************************************************************************
 *********************************************************************************
 * Description:
 * -------------------------------------------------------------------------------
 * This task configures the internal communication structure AND controlls
 * the SuperTrak system.
 *********************************************************************************)

PROGRAM _INIT
 
 // SuperTrak initialization
	IF DiagCpuIsSimulated() THEN
		//SuperTrakInit(TRUE,'/DEVICE=C:\TFS\01_Main\06_PRSystem\SuperTrak_Distribution_V5_3\ConfigurationFiles');
		SuperTrakInit(TRUE,'/DEVICE=\.\SuperTrakuserfile');
	ELSE
		SuperTrakInit(FALSE,'/DEVICE=F:\');
	END_IF;
	
	// Service Channel initialization
	ServiceChannelData.channelId    		:= 1;
	ServiceChannelData.pRequestHeader		:= ADR(gStServiceChannelReqData);
	ServiceChannelData.pResponseHeader		:= ADR(gStServiceChannelResData);
	ServiceChannelData.pRequestValues     	:= ADR(gStServiceChannelReqData) + SIZEOF(ServiceChannelHeader_t);
	ServiceChannelData.pResponseValues    	:= ADR(gStServiceChannelResData) + SIZEOF(ServiceChannelHeader_t);
	
//	ServiceChannelData.pRequest     		:= ADR(gStServiceChannelReqData);
//	ServiceChannelData.pResponse	    	:= ADR(gStServiceChannelResData);
	ServiceChannelData.requestBufferSize  	:= SIZEOF(gStServiceChannelReqData);
	ServiceChannelData.responseBufferSize  	:= SIZEOF(gStServiceChannelResData);
	ServiceChannelData.state     			:= scSTATE_RECV;
 
	pResView ACCESS ADR(gStServiceChannelResData);
	pReqView ACCESS ADR(gStServiceChannelReqData);
 
	// Command interface mapping
	SuperTrakControlInterface[0].pControl  	:= ADR(gStCyclicControlData);
	SuperTrakControlInterface[0].pStatus   	:= ADR(gStCyclicStatusData);
	SuperTrakControlInterface[0].controlSize:= SIZEOF(gStCyclicControlData);
	SuperTrakControlInterface[0].statusSize := SIZEOF(gStCyclicStatusData);
 
END_PROGRAM

PROGRAM _CYCLIC

 // Cylcic SuperTrak control
	SuperTrakCyclic();
 
	// Map internal communication structure
	FOR i := 0 TO stMAX_CONTROL_IF_INDEX DO
		SuperTrakProcessControl(i, SuperTrakControlInterface[i]);
	END_FOR;
	
	// Service channel handling
	IF ServiceChannelData.state = scSTATE_RECV AND
		pReqView.sequence <> pResView.sequence THEN
		ServiceChannelData.requestSequence  := pReqView.sequence;
		ServiceChannelData.state    		:= scSTATE_EXEC;
	ELSIF ServiceChannelData.state = scSTATE_EXEC OR ServiceChannelData.state = scSTATE_WAIT THEN
		SuperTrakServiceChannel(ServiceChannelData);
	ELSIF ServiceChannelData.state = scSTATE_SEND THEN
		ServiceChannelData.state    		:= scSTATE_RECV;
	END_IF;
 
END_PROGRAM

PROGRAM _EXIT

 // Clear internal memory
	SuperTrakExit();

END_PROGRAM


