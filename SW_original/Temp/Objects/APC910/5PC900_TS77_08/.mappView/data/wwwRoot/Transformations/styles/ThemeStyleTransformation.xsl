<?xml version="1.0" encoding="utf-8"?>
<!--
// COPYRIGHT B&R
// Stylesheet to create SCSS for Theme-SCSS (widgets and types)
-->

<xsl:stylesheet version="1.0"
xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
xmlns:wdgst="http://www.br-automation.com/iat2015/styles/engineering/v1"
xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
xmlns:widget="http://www.br-automation.com/iat2014/widget"
xmlns:widgetList="http://www.br-automation.com/iat2015/widgetListDefinition/v2"
xmlns="http://www.br-automation.com/iat2015/styles/engineering/v1">

  <xsl:output method="text" encoding="UTF-8" indent="yes" />
  <!-- param 'elpathdelimiter' for the use in e.g. Linux -->
  <xsl:param name="elpathdelimiter">/</xsl:param>
  <xsl:param name="basepath" select="'../../BRVisu/'"><!-- path to .widget files --></xsl:param>
  <xsl:param name="asBasepath" select="'../../types/'"><!-- path to .type files --></xsl:param>
  <xsl:param name="widgetBasepath" select="'../../../../'"><!-- @import path for widgets base scss --></xsl:param>
  <xsl:param name="systemBasepath" select="'../../../../../types/'"><!-- @import path for types base scss --></xsl:param>
  <xsl:param name="useWidgetIndex">true</xsl:param>

  <!-- include in same directory, as href does not allow the use of a param-->
  <xsl:include href="HelperFunctions.xsl"/>

  <!-- entry point -->
  <xsl:template match="/">
    <xsl:if test="wdgst:Styles">

      <xsl:text>@import "mixins.scss";&#xa;</xsl:text>

      <xsl:for-each select="wdgst:Styles/wdgst:Style">
        <!-- style with id='default' has to be first, as other styles have to be able to override it -->
        <xsl:if test="@id='default'">
          <xsl:call-template name="createStyle" />
        </xsl:if>
      </xsl:for-each>
      <xsl:for-each select="wdgst:Styles/wdgst:Style">
        <xsl:if test="not(@id='default')">
          <xsl:call-template name="createStyle" />
        </xsl:if>
      </xsl:for-each>
    </xsl:if>
  </xsl:template>

  <xsl:template name="createStyle">
    <xsl:variable name="xsiType" select="@xsi:type" />
    <xsl:variable name="widgetIndex" select="concat('..',$elpathdelimiter,'..',$elpathdelimiter,'..',$elpathdelimiter,'..',$elpathdelimiter,'BR.IAT.widgetsfile')"/>
    <!-- useWidgetIndex=true: check if widget is used in project (except of system objects) -->
    <xsl:if test="$useWidgetIndex='false' or document($widgetIndex)//widgetList:widget[@name=$xsiType]/@name or starts-with(@xsi:type,'system.brease.')">

      <xsl:variable name="itemSelector">
        <xsl:call-template name="string-replace-all">
          <xsl:with-param name="text" select="$xsiType" />
          <xsl:with-param name="replace" select="'.'"/>
          <xsl:with-param name="by" select="'_'" />
        </xsl:call-template>
      </xsl:variable>
      <xsl:variable name="itemName">
        <xsl:call-template name="get-item-name">
          <xsl:with-param name="xsiType" select="$xsiType"></xsl:with-param>
        </xsl:call-template>
      </xsl:variable>

      <xsl:variable name="itemPath">
        <xsl:call-template name="string-replace-all">
          <xsl:with-param name="text" select="$xsiType" />
          <xsl:with-param name="replace" select="'.'" />
          <xsl:with-param name="by" select="$elpathdelimiter" />
        </xsl:call-template>
      </xsl:variable>

      <xsl:variable name="typeFile">
        <xsl:call-template name="getTypeFilePath">
          <xsl:with-param name="itemPath" select="$itemPath"/>
          <xsl:with-param name="itemName" select="$itemName"/>
        </xsl:call-template>
      </xsl:variable>

      <xsl:call-template name="setBaseInclude">
        <xsl:with-param name="itemPath" select="$itemPath"/>
        <xsl:with-param name="itemName" select="$itemName"/>
      </xsl:call-template>

      <!--process each Style-->

      <xsl:text>.</xsl:text>
      <xsl:value-of select="$itemSelector"/>
      <xsl:text>_style_</xsl:text>
      <xsl:value-of select="@id"/>
      <xsl:text> {&#xa;</xsl:text>

      <xsl:text>@include </xsl:text>
      <xsl:value-of select="$itemSelector"/>
      <xsl:text>_base</xsl:text>
      <xsl:text>;</xsl:text>

      <xsl:text> &#xa;</xsl:text>
      <xsl:for-each select="@*">
        <xsl:if test="not(name()='id' or name()='xsi:type')">
          <xsl:call-template name="createEntry">
            <xsl:with-param name="typeFile" select="$typeFile"></xsl:with-param>
          </xsl:call-template>
        </xsl:if>
      </xsl:for-each>

      <xsl:text>&#xa;}&#xa;</xsl:text>
    </xsl:if>
  </xsl:template>

  <xsl:template match="*" mode="copy-no-namespaces">
    <xsl:element name="{name(.)}">
      <xsl:copy-of select="@*"/>
      <xsl:apply-templates mode="copy-no-namespaces"/>
    </xsl:element>
  </xsl:template>

  <!--Create Entry for Styleable Property-->
  <xsl:template name="createEntry">
    <xsl:param name="typeFile"></xsl:param>
    <xsl:variable name="propertyName" select="name()"></xsl:variable>
    <xsl:variable name="propertyValue" select="."></xsl:variable>

    <xsl:for-each select="document($typeFile)//widget:StyleProperty[@name=$propertyName]/widget:StyleElement">
      <xsl:choose>
        <xsl:when test="@indexed">
          <xsl:call-template name="generateDynamicSelectors">
            <xsl:with-param name="value" select="$propertyValue" />
            <xsl:with-param name="attribute" select="@attribute" />
            <xsl:with-param name="selector" select="@selector" />
          </xsl:call-template>
        </xsl:when>
        <xsl:otherwise>
          <xsl:call-template name="generateStaticSelector">
            <xsl:with-param name="value" select="$propertyValue" />
            <xsl:with-param name="attribute" select="@attribute" />
            <xsl:with-param name="selector" select="@selector" />
          </xsl:call-template>
        </xsl:otherwise>
      </xsl:choose>
    </xsl:for-each>

  </xsl:template>


  <xsl:template name="generateStaticSelector">
    <xsl:param name="value"></xsl:param>
    <xsl:param name="attribute"></xsl:param>
    <xsl:param name="selector"></xsl:param>
    <xsl:choose>
      <xsl:when test="not($selector) or $selector=''">
        <xsl:call-template name="generateValue">
          <xsl:with-param name="value" select="$value"></xsl:with-param>
          <xsl:with-param name="attribute" select="$attribute"></xsl:with-param>
        </xsl:call-template>
      </xsl:when>
      <xsl:otherwise>
        <xsl:value-of select="$selector"/>
        <xsl:text> {&#xa;</xsl:text>
        <xsl:call-template name="generateValue">
          <xsl:with-param name="value" select="$value"></xsl:with-param>
          <xsl:with-param name="attribute" select="$attribute"></xsl:with-param>
        </xsl:call-template>
        <xsl:text>}&#xa;</xsl:text>
      </xsl:otherwise>
    </xsl:choose>

  </xsl:template>

  <xsl:template name="generateDynamicSelectors">
    <xsl:param name="attribute" />
    <xsl:param name="selector" />
    <xsl:param name="value" />

    <xsl:variable name="listLength">
      <xsl:call-template name="get-list-length">
        <xsl:with-param name="value" select="$value" />
      </xsl:call-template>
    </xsl:variable>

    <xsl:call-template name="dynamicLines">
      <xsl:with-param name="pStart" select="1"/>
      <xsl:with-param name="pEnd" select="$listLength"/>
      <xsl:with-param name="value" select="$value" />
      <xsl:with-param name="attribute" select="$attribute" />
      <xsl:with-param name="selector" select="$selector" />
    </xsl:call-template>

  </xsl:template>

  <xsl:template name="dynamicLines">
    <xsl:param name="pStart"/>
    <xsl:param name="pEnd"/>
    <xsl:param name="value" />
    <xsl:param name="attribute" />
    <xsl:param name="selector" />

    <xsl:if test="not($pStart > $pEnd)">
      <xsl:choose>
        <xsl:when test="$pStart = $pEnd">

          <xsl:variable name="index" select="$pStart"/>
          <xsl:variable name="replacedAttribute">
            <xsl:call-template name="string-replace-all">
              <xsl:with-param name="text" select="$attribute" />
              <xsl:with-param name="replace" select="'$index'" />
              <xsl:with-param name="by" select="$index" />
            </xsl:call-template>
          </xsl:variable>
          <xsl:variable name="replacedSelector">
            <xsl:call-template name="string-replace-all">
              <xsl:with-param name="text" select="$selector" />
              <xsl:with-param name="replace" select="'$index'" />
              <xsl:with-param name="by" select="$index" />
            </xsl:call-template>
          </xsl:variable>

          <xsl:value-of select="$replacedSelector"/>
          <xsl:text>{&#xa;&#x9;&#x9;</xsl:text>

          <xsl:call-template name="generateValue">
            <xsl:with-param name="value" select="$value" />
            <xsl:with-param name="attribute" select="$replacedAttribute" />
          </xsl:call-template>
          <xsl:text>&#x9;}&#xa;</xsl:text>

        </xsl:when>
        <xsl:otherwise>
          <xsl:variable name="vMid" select="floor(($pStart + $pEnd) div 2)"/>
          <xsl:call-template name="dynamicLines">
            <xsl:with-param name="pStart" select="$pStart"/>
            <xsl:with-param name="pEnd" select="$vMid"/>
            <xsl:with-param name="value" select="$value" />
            <xsl:with-param name="attribute" select="$attribute" />
            <xsl:with-param name="selector" select="$selector" />
          </xsl:call-template>
          <xsl:call-template name="dynamicLines">
            <xsl:with-param name="pStart" select="$vMid+1"/>
            <xsl:with-param name="pEnd" select="$pEnd"/>
            <xsl:with-param name="value" select="$value" />
            <xsl:with-param name="attribute" select="$attribute" />
            <xsl:with-param name="selector" select="$selector" />
          </xsl:call-template>
        </xsl:otherwise>
      </xsl:choose>
    </xsl:if>
  </xsl:template>

  <!--Generate Value for Stylable attribute-->
  <xsl:template name="generateValue">
    <xsl:param name="value"></xsl:param>
    <xsl:param name="attribute"></xsl:param>
    <xsl:variable name="preattr">
      <xsl:choose>
        <xsl:when test="contains($attribute,'$value')">
          <xsl:variable name="outattr">
            <xsl:call-template name="string-replace-all">
              <xsl:with-param name="text" select="$attribute" />
              <xsl:with-param name="replace" select="'$value'" />
              <xsl:with-param name="by" select="$value" />
            </xsl:call-template>
          </xsl:variable>
          <xsl:value-of select="$outattr"/>
        </xsl:when>
        <xsl:otherwise>
          <xsl:text>&#x9;</xsl:text>
          <xsl:value-of select="$attribute"/>
          <xsl:text>: </xsl:text>
          <xsl:value-of select="$value"/>
          <xsl:if test="@calc">
            <xsl:value-of select="@calc"/>
          </xsl:if>
        </xsl:otherwise>
      </xsl:choose>
    </xsl:variable>

    <xsl:value-of select="$preattr"/>

    <xsl:text>;&#xa;</xsl:text>
  </xsl:template>

  <xsl:template name="getTypeFilePath">
    <xsl:param name="itemPath"></xsl:param>
    <xsl:param name="itemName"></xsl:param>
    <xsl:choose>
      <xsl:when test="starts-with(@xsi:type,'system.brease')">
        <xsl:value-of select="concat($asBasepath,$itemName,'.type')"/>
      </xsl:when>
      <xsl:otherwise>
        <xsl:value-of select="concat($basepath,$itemPath,$elpathdelimiter,'meta',$elpathdelimiter,$itemName,'.widget')"/>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>

  <!-- path to base mixin -->
  <xsl:template name="setBaseInclude">
    <xsl:param name="itemPath"></xsl:param>
    <xsl:param name="itemName"></xsl:param>

    <xsl:variable name="importPath">
      <xsl:choose>
        <xsl:when test="starts-with(@xsi:type,'system.brease.')">
          <xsl:text>@import "</xsl:text>
          <xsl:value-of select="concat($systemBasepath,substring(@xsi:type,15))"/>
          <xsl:text>_base";&#xa;</xsl:text>
        </xsl:when>
        <xsl:otherwise>
          <xsl:text>@import "</xsl:text>
          <xsl:value-of select="concat($widgetBasepath,$itemPath,$elpathdelimiter,'meta',$elpathdelimiter,$itemName)"/>
          <xsl:text>_base";&#xa;</xsl:text>
        </xsl:otherwise>
      </xsl:choose>
    </xsl:variable>
    <xsl:value-of select="$importPath"/>

  </xsl:template>

</xsl:stylesheet>