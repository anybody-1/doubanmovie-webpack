var Top250Page = require('./top250')
var UsBoxPage = require('./usbox')
var SearchPage = require('./search')
var Paging = require('./paging')
var App = {
  init: function(){
    Paging.init()
    Top250Page.init()
    UsBoxPage.init()
    SearchPage.init()
  }
}
App.init()