import { View, Text, ScrollView, Image, Linking } from "react-native";
import React, { Component } from "react";
import axios from "axios";
import { Card, Title, Paragraph } from "react-native-paper";
import Header from "../../components/AppBar";

//we will use class based component for the homescreen

//we are etting the initial state here it will change after we fetch the data
//"0e7504bf0db745c59da132db72aa21b1"
//GET https://newsapi.org/v2/everything?q=Apple&from=2022-10-16&sortBy=popularity&apiKey=API_KEY

export default class HomeScreen extends Component {
  state = {
    articles: [],
    isLoading: true,
    errors: null,
  };

  getArticles() {
    axios
      .get(
        "https://newsapi.org/v2/everything?q=top&from=2022-10-16&sortBy=popularity&apiKey=0e7504bf0db745c59da132db72aa21b1"
      )
      .then((response) =>
        response.data.articles.map((article) => ({
          date: `${article.publishedAt}`,
          title: `${article.title}`,
          url: `${article.url}`,
          description: `${article.description}`,
          urlToImage: `${article.urlToImage}`,
        }))
      )
      //after fetching data,title,url,description etc we will change the state
      .then((articles) => {
        this.setState({
          articles,
          isLoading: false,
        });
      })
      .catch((error) => this.setState({ error, isLoading: false }));
  }
  componentDidMount() {
    this.getArticles();
  }

  render() {
    const { isLoading, articles } = this.state;
    return (
      <View>
        <Header />
        <ScrollView>
          {!isLoading ? (
            articles.map((article) => {
              const { date, title, url, description, urlToImage } = article;
              return (
                <Card
                  key={url}
                  style={{
                    marginTop: 10,
                    borderColor: "Black",
                    borderRadius: 5,
                    borderBottomWidth: 1,
                  }}
                  onPress={() => {
                    Linking.openURL(`${url}`);
                  }}
                >
                  <View style={{ flexDirection: "row" }}>
                    {/* text */}
                    <View
                      style={{
                        justifyContent: "space-around",
                        flex: 2 / 3,
                        margin: 10,
                      }}
                    >
                      <Title>{title}</Title>
                    </View>
                    {/* Image */}
                    <View style={{ flex: 1 / 3, margin: 10 }}>
                      <Image
                        style={{ width: 120, height: 120 }}
                        source={{ uri: urlToImage }}
                      />
                    </View>
                  </View>
                  <View style={{ margin: 10 }}>
                    <Paragraph>{description}</Paragraph>
                    <Text>Published At: {date}</Text>
                  </View>
                </Card>
              );
            })
          ) : (
            <Text style={{ justifyContent: "center", alignItems: "center" }}>
              Loading...
            </Text>
          )}
        </ScrollView>
      </View>
    );
  }
}
