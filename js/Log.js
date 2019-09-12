(function(){

    var CurrentPageUrl = window.location.href;
    var clientContext = new SP.ClientContext(SiteUrl);
    var oList = clientContext.get_web().get_lists().getByTitle(Log_Access);
    var itemCreateInfo = new SP.ListItemCreationInformation();
    this.oListItem = oList.addItem(itemCreateInfo);

    oListItem.set_item('LinkUrl',CurrentPageUrl);
    oListItem.set_item('PageName',GetCurrentPageName());
    oListItem.set_item('TimeStamp',GetCurrentTime());
    oListItem.update();	
    clientContext.executeQueryAsync(function(){},function(){});
    
})();
