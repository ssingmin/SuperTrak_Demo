(********************************************************************
 * COPYRIGHT -- Bernecker + Rainer
 ********************************************************************
 * Library: AsEth
 * File: AsEth.typ
 * Author: B+R
 ********************************************************************
 * Data types of library AsEth
 ********************************************************************)
                                                                      
TYPE
    ethSTATISTICS_typ	: STRUCT				(*statistics*)
		bytesrecv		: UDINT;				(*bytes received*)
		bytessend		: UDINT;				(*bytes sent*)
		packetsrecv		: UDINT;				(*packets received*)
		packetssend		: UDINT;				(*packets send*)
		mcpacketsrecv	: UDINT;				(*multicast packets received*)
		mcpacketssend	: UDINT;				(*multicats packets sent*)
		errorrecv		: UDINT;				(*input errors*)
		errorsend		: UDINT;				(*output errors*)
		errorframe		: UDINT;				(*frame errors*)
		errorcrc		: UDINT;				(*crc errors*)
		collisions		: UDINT;				(*collisions*)
		latecollision	: UDINT;				(*late collisions*)
		drops			: UDINT;				(*dropped on input*)
		lostcarrier		: UDINT;				(*lost carrier*)
		underflow		: UDINT;				(*silo underflow*)
		retry			: UDINT;				(*retries after 16 collisions*)
		noproto			: UDINT;				(*destined for unsupported protocol*)
		intrecv			: UDINT;				(*reveive interrupts*)
		intsend			: UDINT;				(*transmit interrupts*)
		bufferrecv		: UDINT;				(*receive buffer errror*)
		buffersend		: UDINT;				(*send buffer errror*)
		broadcasts		: UDINT;				(*broadcasts*)
		broadcaststop	: UDINT;				(*broadcast stop*)
		reserve			: ARRAY[0..9] OF UDINT;	(*reserved for future use*)
	END_STRUCT;
END_TYPE
