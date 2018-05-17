var Helpers = require('../helpers/util')
require('./style.css')

var SearchPage = {
    init: function(){
        this.$container = $('#search')
        this.$content = this.$container.find('.container')
        this.page = 0
        this.isFinished = false
        this.isLoading = false
        this.count = 10
        this.bind()
    },
    bind: function(){
        var _this = this
        this.$container.on('scroll', function(){
            if(Helpers.isToBottom(_this.$container, _this.$container.find('.wrap')) && !_this.isFinished && !_this.isLoading){
                _this.getData(function(data){
                    _this.renderData(data)
                    _this.page++
                    if(_this.page * _this.count > data.total){
                        _this.isFinished = true
                    }
                })
            }
        })
        this.$container.find('.search-area .button').on('click', function(){
            _this.$container.find('.container .item').remove()
            _this.getData(function(data){
                _this.renderData(data)
            })
        })
        this.$container.find('.search-area input').on('keyup', function(e){
            if(e.key === 'Enter') {
                _this.$container.find('.container .item').remove()
                _this.getData(function(data){
                    _this.renderData(data)
                })
            }
        })
    },
    getData: function(callback){
        var _this = this
        var keyword = _this.$container.find('.search-area input').val()
        this.isLoading = true
        this.$container.find('.loading').show(100)
        $.ajax({
            url: 'https://api.douban.com/v2/movie/search',
            data: {
                q: keyword
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

module.exports = SearchPage