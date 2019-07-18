import React from "react";
import { fetchTopics } from "../utils/api";
import { Link } from "@reach/router";
import "./CSS/topic.css";
class Topics extends React.Component {
  state = {
    topics: [],
    search: ""
  };
  render() {
    const topics = this.state.topics;
    return (
      <div className="topicPage">
        <div className="TopicSearch">
          <label>Search Topics: </label>
          <input onChange={this.handleChange} id="search" type="text" />
        </div>
        <div className="topicSection">
          {topics
            .filter(item => {
              if (
                item.slug
                  .toLowerCase()
                  .includes(this.state.search.toLowerCase()) ||
                item.description
                  .toLowerCase()
                  .includes(this.state.search.toLowerCase())
              ) {
                return item;
              }
            })
            .map(topic => {
              return (
                <div className="" key={topic.slug}>
                  <Link className="topicLink" to={`/topics/${topic.slug}`}>
                    <div className="topicCard">
                      <p className="topicTitle">Topic: {topic.slug}</p>
                      <p className="topicDescription">
                        Description: {topic.description}
                      </p>
                    </div>
                  </Link>
                </div>
              );
            })}
        </div>
      </div>
    );
  }
  componentDidMount = () => {
    fetchTopics().then(res => {
      const topics = res.data.topics;
      this.setState({ topics });
    });
  };

  handleChange = event => {
    event.preventDefault();

    const key = event.target.id;
    const value = event.target.value;

    this.setState({ [key]: value });
  };
  // handleSubmit = async event => {
  //   event.preventDefault();
  //   await this.setState({ posted: true });
  //   await addComment(
  //     this.props.article_id,
  //     this.state.body,
  //     this.state.username
  //   );
  //   this.setState({
  //     body: ""
  //   });
  // };
}

export default Topics;
