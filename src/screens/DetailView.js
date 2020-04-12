import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView
} from "react-native";
import { connect } from 'react-redux';
import moment from 'moment'
import { getMovieDetail } from '../store/actions/user';

class DetailView extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  componentDidMount() {
    this.props.getMovieDetail(this.props.navigation.getParam("movieId", 0))
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ height: 45, justifyContent: 'center', borderBottomColor: 'gray', borderBottomWidth: 1 }}>
          <TouchableOpacity style={{ marginHorizontal: 10, flexDirection: 'row', alignItems: 'center' }} onPress={() => this.props.navigation.goBack()}>
            <Image
              source={require('../assets/back.png')}
              style={{ height: 30, width: 30, marginRight: 10 }}
              resizeMode={'contain'}
            />
            <Text >Back</Text>
          </TouchableOpacity>
        </View>
        {this.props.movieDetail &&

          <View style={{ flex: 1 }}>
            <View style={{ flex: 1, padding: 10 }}>
              <Image
                source={{ uri: 'https://image.tmdb.org/t/p/w1280/' + this.props.movieDetail.poster_path }}
                style={{ flex: 1 }}
                resizeMode={'cover'}
              />

            </View>
            <View style={{ flex: 1, paddingHorizontal: 10 }}>
              <View style={{ flexDirection: 'row', marginVertical: 10 }}>
                <Text style={{ fontWeight: '600' }}>{this.props.movieDetail.title}</Text>
                <Text style={{ color: 'gray' }}>{`(${this.props.movieDetail.vote_average})`}</Text>
              </View>
              <View style={{ marginVertical: 5}}>
              <Text style={{ color: 'gray' }}>{moment(this.props.movieDetail.release_date).format("YYYY")}{` | ${this.props.movieDetail.runtime}`}</Text>
              <Text style={{ color: 'gray' }}>Cast:</Text>
              </View>
              <ScrollView style={{ flex: 1, marginTop: 10 }}>
                <Text style={{ color: 'gray' }}>{this.props.movieDetail.overview}</Text>
              </ScrollView>
            </View>
          </View>
        }
      </View>
    )
  }
}
const mapStateToProps = state => {
  return {
    movieDetail: state.user.movieDetail,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    getMovieDetail: (movieId) => getMovieDetail(movieId, dispatch)
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailView);
