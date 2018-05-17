var Helpers = require('../helpers/util')
require('./style.css')

var UsBoxPage = {
    init: function(){
        var _this = this
        this.$container = $('#beimei')
        this.$content = this.$container.find('.container')
        this.page = 0
        this.isFinished = false
        this.isLoading = false
        this.count = 10
        this.getData(function(data){
            _this.renderData(data)
            _this.page++
        })
    },
    getData: function(callback){
        var _this = this
        this.isLoading = true
        $.ajax({
            url: 'https://api.douban.com/v2/movie/us_box',
            data: {
                start: this.count * this.page ,
                count: this.count
            },
            dataType: 'jsonp'
        }).done(function(ret){
            _this.isLoading = false
            callback(ret)
        })
    },
    renderData: function(data){
        var _this = this
        data.subjects.forEach(function(item){
            var $node = Helpers.createNode(item.subject)
        _this.$content.append($node)
    })     
    }
}

module.exports = UsBoxPage