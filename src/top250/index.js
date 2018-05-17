var Helpers = require('../helpers/util')
require('./style.css');

var Top250Page = {
    init: function(){
        var _this = this
        this.$container = $('#top250')
        this.$content = this.$container.find('.container')
        this.page = 0
        this.isFinished = false
        this.isLoading = false
        this.count = 10
        this.bind()
        this.getData(function(data){
            _this.renderData(data)
            _this.page++
        })
    },
    bind: function(){
        var _this = this
        this.$container.on('scroll', function(){
            if(Helpers.isToBottom(_this.$container, _this.$content) && !_this.isFinished && !_this.isLoading){
                _this.getData(function(data){
                    _this.renderData(data)
                    _this.page++
                    if(_this.page * _this.count > data.total){
                        _this.isFinished = true
                    }
                })
            }
        })
    },
    getData: function(callback){
        var _this = this
        this.isLoading = true
        this.$container.find('.loading').show(400)
        $.ajax({
            url: 'https://api.douban.com/v2/movie/top250',
            data: {
                start: this.count * this.page ,
                count: this.count
            },
            dataType: 'jsonp'
        }).done(function(ret){
            _this.isLoading = false
            _this.$container.find('.loading').hide()
            callback(ret)
        })
    },
    renderData: function(data){
        var _this = this
        data.subjects.forEach(function(item){
            var $node = Helpers.createNode(item)
        _this.$content.append($node)
    })
        
    }
}
 module.exports = Top250Page