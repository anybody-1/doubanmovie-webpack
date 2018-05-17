var Helpers = {
    isToBottom: function($viewport, $content) {
        return $viewport.height() + $viewport.scrollTop() + 30 > $content.height()

    },
    createNode: function(subject){
        var $node = $('<div class="item">\
                    <a href="#">\
                        <div class="cover">\
                            <img src="https://img3.doubanio.com/view/photo/s_ratio_poster/public/p1910813120.webp" alt="">\
                        </div>\
                        <div class="detail">\
                            <h2>霸王别姬</h2>\
                            <div class="extra"><span class="score"></span> / <span class="collection"></span>收藏</div>\
                            <div class="extra"></div>\
                            <div class="extra"></div>\
                            <div class="extra"></div>\
                        </div>\
                    </a>\
                </div>')
        $node.find('a').attr('href', subject.alt)
        $node.find('.cover img').attr('src', subject.images.small)
        $node.find('.detail h2').text(subject.title)
        $node.find('.detail .score').text(subject.rating.average)
        $node.find('.detail .collection').text(subject.collect_count)
        $node.find('.detail .extra').eq(1).text(subject.year + ' / ' + subject.genres.join('、'))
        $node.find('.detail .extra').eq(2).text('导演：' + subject.directors.map(v=>v.name).join('、'))
        $node.find('.detail .extra').eq(3).text('主演：' + subject.casts.map(v=>v.name).join('、'))
        return $node
    }
}

module.exports = Helpers