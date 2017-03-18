import React from 'react';
import ReactDOM from 'react-dom';

//resources
import './app.css';

//components
import Menu from './Components/Menu/Menu.js';
import Footer from './Components/Footer/Footer.js';
//import FeedSource from './Components/Article/Sources';
import Article from './Components/Article/Article';
//import { getFeeds, getTestData, getListOfUrls } from './Helpers/feeder.js';
import { chunkify } from './Helpers/arrayhelper.js';
import $ from 'jquery';
import { getFeeds, getTestData } from './Helpers/getter.js';


var App = React.createClass({
  getInitialState: function () {
    return getTestData(this);
    //this.setState(result);
    //return result;
  },
  componentDidMount: function () {
    getFeeds(this, 'Latifi');
  },
  sort: function (sortMethod) {
    var sorted = this.state.articles;
    if (sortMethod === 'date')
      sorted = sorted.sort(function (a, b) {
        return b.pubDate - a.pubDate;
      });
    else if (sortMethod === 'title')
      sorted = sorted.sort(function (a, b) {
        return b.title - a.title;
      });
    this.setState({ articles: sorted });
  },
  renderArticle: function (item, key) {
    if (key === 1)
      console.log(item);
    return (
      <Article key={`row_${key}`} details={item} />
    )
  },
  renderColumnWithArticles: function (articles) {

    return articles.map((item, index) =>
      <section className="column">
        <Article key={`row_${index}`} details={item} />
      </section>
    )
  },
  render: function () {
    var articleChunks = chunkify(this.state.articles, 3, true);
    console.log("items", this.state.articles);
    return (
      <div className="app">
        <header className="app-header">
          <menu id="menu">
          </menu>

          <img src={'http://a.espncdn.com/combiner/i?img=/redesign/assets/img/icons/ESPN-icon-mma.png&w=288&h=288&transparent=true'} className="app-logo" alt="logo" />
          <h2>MMA</h2>
          <input type="search"></input>
        </header>

        <div className="container">
          {/*<section className="column">
            {this.state.articles.forEach((item, index) =>
              this.renderArticle(item, index)
            )}
          </section>*/}
          <section className="column">
            {articleChunks[0].map((item, index) =>
              this.renderArticle(item, index)
            )}
          </section>
        </div>

        <section id="footer"></section>

      </div>
    )
  }
});

ReactDOM.render(<App />, document.querySelector('#root'));
ReactDOM.render(<Menu />, document.querySelector('#menu'));
ReactDOM.render(<Footer name="Footer" />, document.querySelector('#footer'));


export default App;