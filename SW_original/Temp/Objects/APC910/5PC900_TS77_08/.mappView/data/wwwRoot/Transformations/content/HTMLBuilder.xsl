<?xml version="1.0" encoding="utf-8"?>
<!--
// COPYRIGHT B&R
// Stylesheet to transform XML Content definition into valid HTML document
-->

<xsl:stylesheet version="1.0"
      xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
      xmlns:iat="http://www.br-automation.com/iat2015/contentDefinition/v2"
      xmlns:widget="http://www.br-automation.com/iat2014/widget"
      xmlns:types="http://www.br-automation.com/iat2015/widgetTypes/v2"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xmlns:msxsl="urn:schemas-microsoft-com:xslt"
      exclude-result-prefixes="iat widget xsi msxsl">

  <xsl:param name="elpathdelimiter">/</xsl:param>

  <xsl:variable name="separator" select="'_'" />
  <xsl:variable name="basepath" select="'..\..\BRVisu\'"></xsl:variable>

  <xsl:output method="xml"
              encoding="UTF-8"
              indent="no"
              omit-xml-declaration="yes" />
  <xsl:strip-space elements="*"/>

  <!-- ### entry point ### -->
  <xsl:template match="/">
    <xsl:param name="contentId" select="iat:Content/@id" />

    <!-- transform all widget options -->
    <xsl:element name="script">
      <xsl:for-each select="//iat:Widget">
        <xsl:call-template name="widgetOptions">
          <xsl:with-param name="contentId" select="$contentId" />
        </xsl:call-template>
      </xsl:for-each>
    </xsl:element>

    <!-- transform all widgets html -->
    <xsl:variable name="htmlResult">
      <xsl:for-each select="iat:Content/iat:Widgets/iat:Widget">
        <xsl:call-template name="widgetHTML">
          <xsl:with-param name="contentId" select="$contentId" />
        </xsl:call-template>
      </xsl:for-each>
    </xsl:variable>

    <!-- modify html result -->
    <xsl:apply-templates mode="pass2" select="msxsl:node-set($htmlResult)/*"/>

  </xsl:template>

  <!-- modifications of resulting html, e.g. allow self closing tags and strip not allowed tags (html, body, etc)-->
  <xsl:template match="*" mode="pass2">
    <xsl:choose>
      <xsl:when test="name()='area' or name()='br' or name()='col' or name()='command' or name()='embed' or name()='hr' or name()='img' or name()='input' or name()='keygen' or name()='param' or name()='source' or name()='track' or name()='wbr'">
        <xsl:element name="{name()}">
          <xsl:copy-of select="@*"/>
        </xsl:element>
      </xsl:when>
      <xsl:when test="name()!='html' and name()!='head' and name()!='meta' and name()!='link' and name()!='title' and name()!='base' and name()!='body' and name()!='style'">
        <xsl:element name="{name()}">
          <xsl:copy-of select="@*"/>
          <xsl:apply-templates mode="pass2"></xsl:apply-templates>
          <xsl:value-of select="''"/>
        </xsl:element>
      </xsl:when>
      <xsl:otherwise></xsl:otherwise>
    </xsl:choose>
  </xsl:template>

  <!-- ### template to create the widget options in JSON notation ### -->
  <xsl:template name="widgetOptions">
    <xsl:param name="contentId" />

    <xsl:variable name="widgetId">
      <xsl:value-of select="@id" />
    </xsl:variable>

    <!-- xsi:type: widget type in dot-notation, e.g. widgets.brease.Button -->

    <!-- extract widget name without namespace from xsi:type, e.g. Button from widgets.brease.Button -->
    <xsl:variable name="widgetName">
      <xsl:call-template name="get-widget-name">
        <xsl:with-param name="xsiType" select="@xsi:type" />
      </xsl:call-template>
    </xsl:variable>

    <!-- convert xsi:type to widget type with slashes, e.g. widgets.brease.Button to widgets/brease/Button -->
    <xsl:variable name="widgetType">
      <xsl:call-template name="get-widget-type">
        <xsl:with-param name="xsiType" select="@xsi:type" />
      </xsl:call-template>
    </xsl:variable>

    <!-- convert xsi:type to widget path with backslashes, e.g. widgets.brease.Button to widgets\brease\Button -->
    <xsl:variable name="widgetPath">
      <xsl:call-template name="get-widget-path">
        <xsl:with-param name="xsiType" select="@xsi:type" />
      </xsl:call-template>
    </xsl:variable>

    <xsl:variable name="pathToWidgetFile" select="concat($basepath,$widgetPath,$elpathdelimiter,'meta',$elpathdelimiter,$widgetName,'.widget')"></xsl:variable>
    <xsl:variable name="htmlFile" select="concat($basepath,$widgetPath,$elpathdelimiter,$widgetName,'.html')"></xsl:variable>
    <xsl:variable name="htmlNode" select="document($htmlFile)/*[1]"></xsl:variable>

    <!-- get HTML-tag name from widget html file -->
    <xsl:variable name="elemName">
      <xsl:value-of select="name($htmlNode)"/>
    </xsl:variable>
    <xsl:variable name="useDOM">
      <xsl:value-of select="$htmlNode/@data-instruction-useDOM"/>
    </xsl:variable>
    <xsl:variable name="addStyleClass">
      <xsl:value-of select="$htmlNode/@data-instruction-addStyleClass"/>
    </xsl:variable>

    <!-- creating the options -->
    <xsl:call-template name="optionsJSON">
      <xsl:with-param name="pathToWidgetFile" select="$pathToWidgetFile" />
      <xsl:with-param name="elemName" select="$elemName" />
      <xsl:with-param name="contentId" select="$contentId" />
      <xsl:with-param name="widgetId" select="$widgetId" />
      <xsl:with-param name="widgetType" select="$widgetType" />
      <xsl:with-param name="addStyleClass" select="$addStyleClass" />
    </xsl:call-template>

  </xsl:template>

  <!-- ### template to create the html element ### -->
  <xsl:template name="widgetHTML">
    <xsl:param name="contentId" />

    <xsl:variable name="widgetId">
      <xsl:value-of select="@id" />
    </xsl:variable>

    <!-- extract widget name without namespace from xsi:type, e.g. Button from widgets.brease.Button -->
    <xsl:variable name="widgetName">
      <xsl:call-template name="get-widget-name">
        <xsl:with-param name="xsiType" select="@xsi:type" />
      </xsl:call-template>
    </xsl:variable>

    <!-- convert xsi:type to widget type with slashes, e.g. widgets.brease.Button to widgets/brease/Button -->
    <xsl:variable name="widgetType">
      <xsl:call-template name="get-widget-type">
        <xsl:with-param name="xsiType" select="@xsi:type" />
      </xsl:call-template>
    </xsl:variable>

    <!-- convert xsi:type to widget path with backslashes, e.g. widgets.brease.Button to widgets\brease\Button -->
    <xsl:variable name="widgetPath">
      <xsl:call-template name="get-widget-path">
        <xsl:with-param name="xsiType" select="@xsi:type" />
      </xsl:call-template>
    </xsl:variable>

    <!-- convert xsi:type to style path with underscore -->
    <xsl:variable name="stylePath">
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="@xsi:type" />
        <xsl:with-param name="replace" select="'.'" />
        <xsl:with-param name="by" select="'_'" />
      </xsl:call-template>
    </xsl:variable>

    <!-- generate style name for html-attribute 'class' -->
    <xsl:variable name="styleName">
      <xsl:choose>
        <xsl:when test="@style">
          <xsl:value-of select="concat($stylePath,'_style_',@style)"/>
        </xsl:when>
        <xsl:otherwise>
          <xsl:value-of select="concat($stylePath,'_style_default')"/>
        </xsl:otherwise>
      </xsl:choose>
    </xsl:variable>

    <xsl:variable name="pathToWidgetFile" select="concat($basepath,$widgetPath,$elpathdelimiter,'meta',$elpathdelimiter,$widgetName,'.widget')"></xsl:variable>
    <xsl:variable name="htmlFile">
      <xsl:call-template name="get-html-path">
        <xsl:with-param name="basepath" select="$basepath" />
        <xsl:with-param name="widgetPath" select="$widgetPath" />
        <xsl:with-param name="widgetName" select="$widgetName" />
        <xsl:with-param name="superClass" select="document($pathToWidgetFile)//widget:Inheritance/widget:Class[@level='1']/text()" />
      </xsl:call-template>
    </xsl:variable>
    <xsl:variable name="htmlNode" select="document($htmlFile)/*[1]"></xsl:variable>

    <!-- get HTML-tag name from widget html file -->
    <xsl:variable name="elemName">
      <xsl:value-of select="name($htmlNode)"/>
    </xsl:variable>
    <xsl:variable name="useDOM">
      <xsl:value-of select="$htmlNode/@data-instruction-useDOM"/>
    </xsl:variable>
    <xsl:variable name="addStyleClass">
      <xsl:value-of select="$htmlNode/@data-instruction-addStyleClass"/>
    </xsl:variable>

    <!-- creating the element with attributes (id, data-brease-widget, etc -->
    <xsl:element name="{$elemName}">
      <xsl:call-template name="attributes">
        <xsl:with-param name="elemName" select="$elemName" />
        <xsl:with-param name="contentId" select="$contentId" />
        <xsl:with-param name="widgetId" select="$widgetId" />
        <xsl:with-param name="widgetType" select="$widgetType" />
        <xsl:with-param name="addStyleClass" select="$addStyleClass" />
      </xsl:call-template>

      <!-- use html-file for specified widgets [data-instruction-useDOM='true'] -->
      <xsl:if test="$useDOM='true' or $addStyleClass='true'">
        <xsl:for-each select="document($htmlFile)/*[1]">
          <xsl:call-template name="modifyDOM">
            <xsl:with-param name="styleName" select="$styleName" />
            <xsl:with-param name="addStyleClass" select="$addStyleClass" />
            <xsl:with-param name="useDOM" select="$useDOM" />
          </xsl:call-template>
        </xsl:for-each>
      </xsl:if>
    </xsl:element>
  </xsl:template>

  <!-- ### template to create the options JSON ### -->
  <xsl:template name="optionsJSON">
    <xsl:param name="pathToWidgetFile" />
    <xsl:param name="elemName" />
    <xsl:param name="contentId" />
    <xsl:param name="widgetId" />
    <xsl:param name="widgetType" />
    <xsl:param name="addStyleClass" />

    <xsl:text>brease.setOptions("</xsl:text>
    <xsl:value-of select="$contentId"/>
    <xsl:value-of select="$separator" />
    <xsl:value-of select="$widgetId"/>
    <xsl:text>", </xsl:text>

    <!-- insert properties as JSON -->
    <xsl:text>{</xsl:text>
    <xsl:for-each select="@*">
      <xsl:if test="not(name()='id') and not(name()='xsi:type')">
        <xsl:call-template name="options">
          <xsl:with-param name="pathToWidgetFile" select="$pathToWidgetFile" />
          <xsl:with-param name="widgetType" select="$widgetType" />
          <xsl:with-param name="quote">"</xsl:with-param>
        </xsl:call-template>
      </xsl:if>
    </xsl:for-each>

    <!-- convert element based array properties to JSON array -->
    <xsl:for-each select="iat:Properties/*">

      <xsl:variable name="propertyName" select="name()"/>

      <xsl:text>"</xsl:text>
      <xsl:value-of select="$propertyName"></xsl:value-of>
      <xsl:text>":[</xsl:text>

      <xsl:for-each select="./types:Element">
        <xsl:call-template name="elementValue">
          <xsl:with-param name="value" select="@value" />
          <xsl:with-param name="propType" select="document($pathToWidgetFile)//widget:Property[@name=$propertyName]/@type" />
          <xsl:with-param name="quote">"</xsl:with-param>
        </xsl:call-template>
        <xsl:if test="not(position()=last())">
          <xsl:text>, </xsl:text>
        </xsl:if>
      </xsl:for-each>

      <xsl:text>],</xsl:text>
    </xsl:for-each>

    <xsl:text>"className":"</xsl:text>
    <xsl:value-of select="$widgetType"/>
    <xsl:text>", "parentContentId":"</xsl:text>
    <xsl:value-of select="$contentId"/>
    <xsl:text>"</xsl:text>
    <xsl:if test="$addStyleClass='true'">
      <xsl:text>,"styleClassAdded":true</xsl:text>
    </xsl:if>
    <xsl:text>});
</xsl:text>

  </xsl:template>

  <!-- ### template to create the attributes of the html-element ### -->
  <xsl:template name="attributes">

    <xsl:param name="elemName" />
    <xsl:param name="contentId" />
    <xsl:param name="widgetId" />
    <xsl:param name="widgetType" />

    <xsl:attribute name="id">
      <xsl:value-of select="$contentId"/>
      <xsl:value-of select="$separator" />
      <xsl:value-of select="$widgetId"/>
    </xsl:attribute>

    <xsl:attribute name="data-brease-widget">
      <xsl:value-of select="$widgetType"/>
    </xsl:attribute>

    <!--insert width/height for canvas if available-->
    <xsl:if test="$elemName = 'canvas'">
      <xsl:if test="@width">
        <xsl:attribute name="width">
          <xsl:value-of select="@width"/>
        </xsl:attribute>
      </xsl:if>
      <xsl:if test="@height">
        <xsl:attribute name="height">
          <xsl:value-of select="@height"/>
        </xsl:attribute>
      </xsl:if>
    </xsl:if>

    <xsl:if test="iat:Widgets/iat:Widget">
      <!-- recursive call of the widget template to handle child widgets -->
      <xsl:for-each select="iat:Widgets/iat:Widget">
        <xsl:call-template name="widgetHTML">
          <xsl:with-param name="contentId" select="$contentId" />
        </xsl:call-template>
      </xsl:for-each>
    </xsl:if>
  </xsl:template>

  <!-- use DOM of HTML file for widgets with useDOM=true-->
  <xsl:template name="modifyDOM">
    <xsl:param name="styleName" />
    <xsl:param name="addStyleClass" />
    <xsl:param name="useDOM" />
    <xsl:if test="$useDOM='true'">
      <xsl:copy-of select="@*[name()!='id' and name()!='class' and name()!='data-brease-widget' and substring(name(), 0, 17)!='data-instruction']"/>
    </xsl:if>
    <!-- add style class to attribute 'class': -->
    <xsl:if test="$addStyleClass='true'">
      <xsl:attribute name="class">
        <xsl:choose>
          <xsl:when test="@class">
            <xsl:value-of select="concat(@class,' ',$styleName)"/>
          </xsl:when>
          <xsl:otherwise>
            <xsl:value-of select="$styleName"/>
          </xsl:otherwise>
        </xsl:choose>
      </xsl:attribute>
    </xsl:if>
    <xsl:if test="$addStyleClass!='true' and @class">
      <xsl:attribute name="class">
        <xsl:value-of select="@class"/>
      </xsl:attribute>
    </xsl:if>
    <xsl:if test="$useDOM='true'">
      <xsl:copy-of select="/*/*"/>
    </xsl:if>
  </xsl:template>

  <xsl:template name="elementValue">
    <xsl:param name="value" />
    <xsl:param name="propType" />
    <xsl:param name="quote" />

    <xsl:choose>
      <xsl:when test="$propType='StringArray1D'">
        <xsl:text>"</xsl:text>
        <xsl:call-template name="string-replace-specialAndQuote">
          <xsl:with-param name="text" select="$value" />
          <xsl:with-param name="quote" select="$quote" />
        </xsl:call-template>
        <xsl:text>"</xsl:text>
      </xsl:when>
      <xsl:when test="$propType='DateTimeArray1D'">
        <xsl:text>"</xsl:text>
        <xsl:value-of select="$value"/>
        <xsl:text>"</xsl:text>
      </xsl:when>
      <xsl:when test="$propType='NumberArray1D'">
        <xsl:value-of select="$value"/>
      </xsl:when>
      <xsl:when test="$propType='BooleanArray1D'">
        <xsl:value-of select="$value"/>
      </xsl:when>
      <xsl:otherwise>
        <xsl:text>"</xsl:text>
        <xsl:value-of select="$value"/>
        <xsl:text>"</xsl:text>
      </xsl:otherwise>
    </xsl:choose>

  </xsl:template>

  <!-- ### template to handle the properties based on property type ### -->
  <xsl:template name="options">
    <xsl:param name="pathToWidgetFile" />
    <xsl:param name="widgetType" />
    <xsl:param name="quote" />

    <xsl:variable name="propertyName" select="name()"/>
    <xsl:variable name="propertyType" select="document($pathToWidgetFile)//widget:Property[@name=$propertyName]/@type" />

    <xsl:variable name="propType">
      <xsl:choose>
        <xsl:when test="$propertyType">
          <xsl:value-of select="$propertyType"/>
        </xsl:when>
        <xsl:otherwise>
          <xsl:value-of select="document($pathToWidgetFile)//widget:StyleProperty[@name=$propertyName]/@type"/>
        </xsl:otherwise>
      </xsl:choose>
    </xsl:variable>

    <!-- check if property value is not empty -->
    <xsl:if test="not(string-length(.)=0) or $propType='String'">

      <xsl:value-of select="$quote"/>
      <xsl:value-of select="$propertyName"/>
      <xsl:value-of select="$quote"/>
      <xsl:text>: </xsl:text>
      <xsl:choose>

        <!-- string type -->
        <xsl:when test="$propType='String'">
          <xsl:value-of select="$quote"/>
          <xsl:call-template name="string-replace-specialAndQuote">
            <xsl:with-param name="text" select="." />
            <xsl:with-param name="quote" select="$quote" />
          </xsl:call-template>
          <xsl:value-of select="$quote"/>
        </xsl:when>

        <!-- decimal types -->
        <xsl:when test="$propType='Number' or $propType='UNumber' or $propType='Double' or $propType='Opacity' or $propType='Percentage'">
          <xsl:value-of select="."/>
        </xsl:when>

        <!-- integer types -->
        <xsl:when test="$propType='Integer' or $propType='UInteger' or $propType='Index'">
          <xsl:value-of select="."/>
        </xsl:when>

        <!-- ambiguous types -->
        <xsl:when test="$propType='Size' and substring(.,string-length(.))='%'">
          <xsl:value-of select="$quote"/>
          <xsl:value-of select="."/>
          <xsl:value-of select="$quote"/>
        </xsl:when>
        <xsl:when test="$propType='Size'">
          <xsl:value-of select="."/>
        </xsl:when>

        <!-- boolean types -->
        <xsl:when test="$propType='Boolean'">
          <xsl:value-of select="."/>
        </xsl:when>

        <!-- object types -->
        <xsl:when test="$propType='Object' or $propType='brease.config.MeasurementSystemUnit' or $propType='brease.config.MeasurementSystemFormat' or $propType='brease.datatype.Notification' or $propType='brease.datatype.Node' or $propType='brease.datatype.ArrayNode'">
          <xsl:value-of select="."/>
        </xsl:when>

        <!-- array types -->
        <xsl:when test="$propType='Array' or $propType='RoleCollection' or $propType='GraphicCollection'">
          <xsl:value-of select="."/>
        </xsl:when>
        <xsl:when test="$propType='ItemCollection' or $propType='StepItemStyleReferenceCollection'">
          <xsl:call-template name="string-replace-special">
            <xsl:with-param name="text" select="." />
          </xsl:call-template>
        </xsl:when>

        <!-- list types -->
        <xsl:when test="$propType='StringList'">
          <xsl:text>[</xsl:text>
          <xsl:call-template name="string-replace-specialAndQuote">
            <xsl:with-param name="text" select="." />
            <xsl:with-param name="quote" select="$quote" />
          </xsl:call-template>
          <xsl:text>]</xsl:text>
        </xsl:when>
        <xsl:when test="$propType='IntegerList'">
          <xsl:text>[</xsl:text>
          <xsl:value-of select="."/>
          <xsl:text>]</xsl:text>
        </xsl:when>

        <!-- file path types -->
        <xsl:when test="$propType='ImagePath' or $propType='PdfPath' or $propType='DirectoryPath'">
          <xsl:value-of select="$quote"/>
          <xsl:call-template name="string-replace-all">
            <xsl:with-param name="text" select="." />
            <xsl:with-param name="replace" select="' '" />
            <xsl:with-param name="by" select="'%20'" />
          </xsl:call-template>
          <xsl:value-of select="$quote"/>
        </xsl:when>

        <!-- string based types (e.g. enums) -->
        <xsl:otherwise>
          <xsl:value-of select="$quote"/>
          <xsl:value-of select="."/>
          <xsl:value-of select="$quote"/>
        </xsl:otherwise>
      </xsl:choose>
      <xsl:text>,</xsl:text>
    </xsl:if>

  </xsl:template>

  <!-- template to get the widget name without namespace e.g. "Button" from "widgets.brease.Button" -->
  <xsl:template name="get-widget-name">
    <xsl:param name="xsiType"></xsl:param>
    <xsl:choose>
      <xsl:when test="contains($xsiType,'.')">
        <xsl:call-template name="get-widget-name">
          <xsl:with-param name="xsiType" select="substring-after($xsiType,'.')"></xsl:with-param>
        </xsl:call-template>
      </xsl:when>
      <xsl:otherwise>
        <xsl:value-of select="$xsiType"/>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>

  <!-- template to get the widget type e.g. "widgets/brease/Button" from "widgets.brease.Button" -->
  <xsl:template name="get-widget-type">
    <xsl:param name="xsiType"></xsl:param>
    <xsl:call-template name="string-replace-all">
      <xsl:with-param name="text" select="$xsiType" />
      <xsl:with-param name="replace" select="'.'" />
      <xsl:with-param name="by" select="'/'" />
    </xsl:call-template>
  </xsl:template>

  <!-- template to get the widget path e.g. "widgets\brease\Button" from "widgets.brease.Button" -->
  <xsl:template name="get-widget-path">
    <xsl:param name="xsiType"></xsl:param>
    <xsl:call-template name="string-replace-all">
      <xsl:with-param name="text" select="$xsiType" />
      <xsl:with-param name="replace" select="'.'" />
      <xsl:with-param name="by" select="'\'" />
    </xsl:call-template>
  </xsl:template>

  <!-- replace all occurences of "by" in "text" -->
  <xsl:template name="string-replace-all">
    <xsl:param name="text" />
    <xsl:param name="replace" />
    <xsl:param name="by" />
    <xsl:choose>
      <xsl:when test="contains($text, $replace)">
        <xsl:value-of select="substring-before($text,$replace)" />
        <xsl:value-of select="$by" />
        <xsl:call-template name="string-replace-all">
          <xsl:with-param name="text" select="substring-after($text,$replace)" />
          <xsl:with-param name="replace" select="$replace" />
          <xsl:with-param name="by" select="$by" />
        </xsl:call-template>
      </xsl:when>
      <xsl:otherwise>
        <xsl:value-of select="$text" />
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>

  <!-- replace html entities and doublequote(") -->
  <xsl:template name="string-replace-specialAndQuote">
    <xsl:param name="text" />
    <xsl:param name="quote" />

    <xsl:variable name="replace1">
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="$text" />
        <xsl:with-param name="replace" select="$quote" />
        <xsl:with-param name="by">
          <xsl:text>\</xsl:text>
          <xsl:value-of select="$quote"/>
        </xsl:with-param>
      </xsl:call-template>
    </xsl:variable>

    <xsl:call-template name="string-replace-special">
      <xsl:with-param name="text" select="$replace1" />
    </xsl:call-template>

  </xsl:template>

  <!-- replace html entities -->
  <xsl:template name="string-replace-special">
    <xsl:param name="text" />

    <xsl:variable name="replace1">
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="$text" />
        <xsl:with-param name="replace" select="'&gt;'" />
        <xsl:with-param name="by" select="'\u003E'" />
      </xsl:call-template>
    </xsl:variable>

    <xsl:variable name="replace2">
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="$replace1" />
        <xsl:with-param name="replace" select="'&lt;'" />
        <xsl:with-param name="by" select="'\u003C'" />
      </xsl:call-template>
    </xsl:variable>

    <xsl:call-template name="string-replace-all">
      <xsl:with-param name="text" select="$replace2" />
      <xsl:with-param name="replace" select="'&amp;'" />
      <xsl:with-param name="by" select="'\u0026'" />
    </xsl:call-template>

  </xsl:template>

  <!-- find HTML file for widget (optional with inheritance) -->
  <xsl:template name="get-html-path">
    <xsl:param name="basepath" />
    <xsl:param name="widgetPath" />
    <xsl:param name="widgetName" />
    <xsl:param name="superClass" />

    <xsl:variable name="filePath" select="concat($basepath,$widgetPath,$elpathdelimiter,$widgetName,'.html')"></xsl:variable>
    <xsl:choose>
      <xsl:when test="document($filePath)/*[1]/@data-instruction-inherit='true'">

        <xsl:variable name="superClassPath">
          <xsl:call-template name="get-widget-path">
            <xsl:with-param name="xsiType" select="$superClass" />
          </xsl:call-template>
        </xsl:variable>

        <xsl:variable name="superClassName">
          <xsl:call-template name="get-widget-name">
            <xsl:with-param name="xsiType" select="$superClass" />
          </xsl:call-template>
        </xsl:variable>

        <xsl:variable name="superClassWidgetFile" select="concat($basepath,$superClassPath,$elpathdelimiter,'meta',$elpathdelimiter,$superClassName,'.widget')"></xsl:variable>
        <xsl:call-template name="get-html-path">
          <xsl:with-param name="basepath" select="$basepath" />
          <xsl:with-param name="widgetPath" select="$superClassPath" />
          <xsl:with-param name="widgetName" select="$superClassName" />
          <xsl:with-param name="superClass" select="document($superClassWidgetFile)//widget:Inheritance/widget:Class[@level='1']/text()" />
        </xsl:call-template>
      </xsl:when>
      <xsl:otherwise>
        <xsl:value-of select="$filePath" />
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>

</xsl:stylesheet>