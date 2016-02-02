var React = require('react');
var Immutable = require('immutable');

var rest = require('rest');

var Photo = React.createClass({

    getInitialState: function () {
        return {
            data: Immutable.Map({photos: Immutable.List()})
        }
    },

    componentDidMount: function(){
        var _this = this;
        this.loadFlicrPhotos();

        setInterval(function(){
            _this.loadFlicrPhotos();
        },1000);
    },

    shouldComponentUpdate: function(nextProps, nextState) {
        console.log(!nextState.data.equals(this.state.data));
        return !nextState.data.equals(this.state.data);
    },


    loadFlicrPhotos: function () {

        var _this = this;

        var success = function (photosets) {
            var photos;

            if (photos = photosets.photoset.photo) {
                var photosUrl = [];
                _this.setState(function (prevState) {
                    for (var i = 0; i < photos.length; i++) {
                        var photo = photos[i];
                        photosUrl.push(photo.url = 'http://farm' + photo.farm + '.static.flickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret + '_m.jpg');
                    }
                    return {
                        data:  prevState.data.set('photos',Immutable.List(photosUrl))
                    };
                });
            }
        };

        var error = function (exp) {
            console.log(exp);
        };

        rest('https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&&api_key=3c1418dbf3a12b1c039d555f403b1f8b&photoset_id=72157663656215560&format=json&nojsoncallback=1').then(function (response) {
            success(JSON.parse(response.entity));
        }).catch(function (exp) {
            error(exp);
        });
    },

    onClick: function () {
        this.loadFlicrPhotos();
    },

    getPhotosHtml: function () {
        var photosHtml = [];

        var key = 0;
        this.state.data.get('photos').map(function(item){
            photosHtml.push(
                <div key={key} className="col-xs-6 col-md-3" >
                    <a href="#" className="thumbnail" style={{width: "240px", height: "180px", owerflow: "hidden"}}>
                        <img src={item} alt="Image" style={{width: "100%"}}/>
                    </a>
                </div>
            );
            key++;
        });

        return photosHtml;
    },

    render: function () {

        var photosHtml = this.getPhotosHtml();

        return (
            <div>
                <div className="page-header">
                    <div className="row">
                        <div className="col col-md-10 vcenter">
                            <h1>Flickr photogallery <small>Frontend Masters #2</small>
                            </h1>
                        </div>
                        <div className="col col-md-2 vcenter">
                            <button className="btn btn-success" onClick={this.onClick}>Nacitaj nove fotky</button>
                        </div>
                    </div>

                </div>

                <div className="col-md-12">
                    {photosHtml}
                </div>
            </div>
        );
    }
});

module.exports = Photo;