define([], function() {
  return {
    "SearchQuerySettingsGroupName": "Search query configuration",
    "SearchSettingsGroupName": "Search settings",
    "SearchQueryKeywordsFieldLabel": "Search query keywords",
    "QueryTemplateFieldLabel": "Query template",
    "SelectedPropertiesFieldLabel": "Selected Properties",
    "LoadingMessage": "Results are loading, please wait...",
    "MaxResultsCount": "Number of items to retrieve per page",
    "NoResultMessage": "There are no results to show",    
    "FilterPanelTitle": "Available filters",
    "FilterResultsButtonLabel": "Filters",
    "SelectedFiltersLabel": "Selected filters:",
    "RemoveAllFiltersLabel": "Remove all filters",
    "ShowPagingLabel": "Show paging",
    "ShowResultsCountLabel": "Show results count",
    "ShowBlankLabel": "Show blank if no result",
    "ShowBlankEditInfoMessage": "No result returned for this query. This Web Part will remain blank in display mode according to parameters.",
    "NoFilterConfiguredLabel": "No filter configured", 
    "SearchQueryPlaceHolderText": "Search query in KQL format",
    "EmptyFieldErrorMessage": "This field cannot be empty",
    "PlaceHolderEditLabel": "Edit",
    "PlaceHolderConfigureBtnLabel": "Configure",
    "PlaceHolderIconText": "Search Results Web Part with Refinements",
    "PlaceHolderDescription": "This component displays search results with paging and customizable refinement panel",
    "ResultSourceIdLabel": "Result Source Identifier",
    "InvalidResultSourceIdMessage": "Invalid identifier",
    "EnableQueryRulesLabel": "Enable query rules",
    "StylingSettingsGroupName": "Styling options",
    "SelectedPropertiesFieldDescription": "Speficies the properties to retrieve from the search results.",
    "SearchQueryKeywordsFieldDescription": "Use pre-defined search query keywords to retrieve a static set of results.",
    "CountMessageLong": "<b>{0}</b> results for '<em>{1}</em>'",
    "CountMessageShort": "<b>{0}</b> results",
    "CancelButtonText": "Cancel",
    "DialogButtonLabel": "Styles",
    "DialogButtonText": "Edit template",
    "DialogTitle": "Edit results template",
    "SaveButtonText": "Save",
    "ListLayoutOption": "List",
    "TilesLayoutOption": "Tiles",
    "CustomLayoutOption": "Custom",
    "TemplateUrlFieldLabel": "Use an external template URL",
    "TemplateUrlPlaceholder": "https://myfile.html",
    "ErrorTemplateExtension": "The template must be a valid .htm or .html file",
    "ErrorTemplateResolve": "Unable to resolve the specified template. Error details: '{0}'",
    "WebPartTitle": "Web part title",
    "HandlebarsHelpersDescription": "Enable functions from moment and handlebars helpers. See https://github.com/SharePoint/sp-dev-fx-webparts/blob/master/samples/react-search-refiners/README.md#available-tokens for more information.",
    "PromotedResultsLabel": "Promoted result(s)",
    "PanelCloseButtonAria":"Close",
    "Sort": {
      "SortableFieldsPropertyPaneField": "Sortable properties",
      "SortableFieldsDescription": "Specifies sortable properties that users can use in the UI. Only one property can be used at a time for sorting and will override the search order specified in the WP if exists.",
      "SortPropertyPaneFieldLabel": "Sort order",
      "SortListDescription": "Specify the sort order for the search results. This will only  applied when no manual filters have been set (i.e. sortable fields)",
      "SortDirectionAscendingLabel":"Ascending",
      "SortDirectionDescendingLabel":"Descending",
      "SortErrorMessage":"Invalid search property (Check if the managed property is sortable).",
      "SortPanelSortFieldLabel":"Sort on field",
      "SortPanelSortFieldAria":"Select a field",
      "SortPanelSortFieldPlaceHolder":"Select a field",
      "SortPanelSortDirectionLabel":"Sort Direction",
      "SortableFieldManagedPropertyField": "Sort managed property",
      "SortableFieldDisplayValueField": "Field name to display",
      "EditSortableFieldsLabel": "Edit sortable fields",
      "EditSortLabel": "Edit sort order"
    },
    "Refiners": {
      "RefinersFieldLabel": "Refiners",
      "RefinerManagedPropertyField": "Filter managed property",
      "RefinerDisplayValueField": "Filter name to display",
      "RefinersFieldDescription": "Specifies managed properties used as refiners. If there are no values for a filter property, it won't appear in the panel.",
      "EditRefinersLabel": "Edit refiners"
    },
    "TermNotFound": "(Term with ID '{0}' not found)",
    "UseDefaultSearchQueryKeywordsFieldLabel": "Use a default search query",
    "DefaultSearchQueryKeywordsFieldLabel": "Default search query",
    "DefaultSearchQueryKeywordsFieldDescription": "This query will be used when the data source value is still empty.",
    "ResultTypes": {
      "ResultTypeslabel": "Result Types",
      "ResultTypesDescription": "Add here the display templates to use for result items according one ore more conditions. Conditions are evalued in the configured order.",
      "EditResultTypesLabel": "Edit Result Types",
      "ConditionPropertyLabel": "Managed Property",
      "ConditionValueLabel": "Condition Value",
      "CondtionOperatorValue": "Operator",
      "ExternalUrlLabel": "External Template Url",
      "EqualOperator": "Equals",
      "ContainsOperator": "Contains",
      "StartsWithOperator": "Starts with",
      "NotNullOperator": "Is not null",
      "GreaterOrEqualOperator": "Greater or equal",
      "GreaterThanOperator": "Greater than",
      "LessOrEqualOperator": "Less or equal",
      "LessThanOperator": "Less than"
    }
  }
});