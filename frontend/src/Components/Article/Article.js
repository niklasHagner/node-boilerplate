import React from 'react';
import './articles.css';
//import classNames from 'classnames';
var classNames = require('classnames');


var Article = React.createClass({
  getInitialState() {
    return { expanded: false };
  },
  toggleExpand: function (e) {
    console.log(this.state.expanded);
    this.setState({ expanded: !this.state.expanded });
  },
  render: function () {
    var details = this.props.details,
      styles = {
        //backgroundColor: details.color
      };
    var classes = [
      'article',

    ];

    var npmClassnames = classNames('btn', this.props.className, {
      'btn-pressed': this.state.isPressed,
      'btn-over': !this.state.isPressed && this.state.isHovered
    });

    var classesConcat = 'article';
    if (this.state.expanded)
      classesConcat += ' article--expanded';

    var classArray = [
      'article',
      this.state.expanded ? 'article--expanded' : '',
    ];

    // var fightsHtml = [];
    // if (details.recentYears)
    //   details.recentYears.forEach((item, i) => {
    //     fightsHtml.push(<p key={i}>{item}</p>);
    //   });
    var losses = [],
      wins = [];
    if (details.wins && details.losses) {

      details.losses.forEach(function (item, i) {
        var roundString = item.method.indexOf("Decision") > -1 ? "" : "round " + item.round;
        var way = " [" + item.method + ", " + roundString + "]";
        losses.push(<p key={i}>{item.year + ": " + item.result + " vs " + item.opponentName + way}</p>);

      });
      details.wins.forEach(function (item, i) {
        var roundString = item.method.indexOf("Decision") > -1 ? "" : "round " + item.round;
        var way = " [" + item.method + ", " + roundString + "]";

        wins.push(<p key={i}>{item.year + ": " + item.result + " vs " + item.opponentName + way}</p>);
      });
    }

    var fightsHtml = [];
    if (details.fightHistory) {
      fightsHtml = details.fightHistory.map((item, i) => {
        var colorStyles = {
          color: item.method === "win" ? 'green' : 'red'
        };
        var roundString = item.method.indexOf("Decision") > -1 ? "" : "round " + item.round;
        var way = " [" + item.method + ", " + roundString + "]";
        return (<p style={styles} key={i} > {item.year + ": " + item.result + " vs " + item.opponentName + way}</p >);
      });
    }

    return (
      <article className={classArray.join(' ')} onClick={this.toggleExpand}>

        <section className="article__header">
          <h3 className="article__category" style={styles}>{details.association}</h3>
          <h2 className="article__title">{details.name}</h2>
          <img src={details.image} />
          <div className="details">
            <span>Age: {details.age}</span>
            <span>{details.height_cm} cm</span>
            <span>{details.weight_kg} kg</span>
          </div>
          <div className="fights">
            <header>Wins</header>
            {wins}
            <header>Losses</header>
            {losses}
          </div>
        </section>

        <section className="article__description">
          {fightsHtml}
        </section>

      </article>
    )
  },
  componentDidMount: function () {
  },

});

export default Article;