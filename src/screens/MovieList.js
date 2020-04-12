import React, { Component } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  Image,
  Dimensions
} from "react-native";
import { connect } from 'react-redux';
import { getMovieList, searchMovie } from '../store/actions/user';

const { height, width } = Dimensions.get('screen');

class MovieList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      pageNo:1,
      lazyLoading: false,
      searchTerm:''      
    }
  }
componentDidMount(){
  this.props.getMovieList(1,this.state.lazyLoading )
}

onSearchTextChangeNew = () => {
  if (this.state.typingTimeout) {
    clearTimeout(this.state.typingTimeout);
  }
  this.setState({
    typingTimeout: setTimeout(() => {
      this.onSearchTextChange();
    }, 500)
  });
}
onSearchTextChange() {
  if(this.state.searchTerm.length === 0){
    this.setState({ pageNo:1})
    this.props.getMovieList(1,this.state.lazyLoading )
  }else{
  this.setState({ pageNo: 1},()=>{
    this.props.searchMovie( this.state.searchTerm, 1, false)
  })
}
}

loadNextItems(){
  if(!this.props.isLoading && this.state.searchTerm.length === 0){
    this.setState({pageNo: this.state.pageNo + 1}, ()=>{
      this.props.getMovieList(this.state.pageNo, true)
    })
  }else if(this.state.searchTerm.length > 0){
    this.setState({pageNo: this.state.pageNo + 1}, ()=>{
      this.props.searchMovie( this.state.searchTerm, this.state.pageNo, true)
    })
  }
}


renderItem = ({ item, index }) => {
    return (<TouchableOpacity style={{ flex: 1, padding: 5, paddingLeft: (index % 2 === 1) ? 5 : 10, paddingRight: (index % 2 === 1) ? 10 : 5 }}  
        onPress={()=> this.props.navigation.navigate('DetailView',{movieId: item.id})}
    >
      <View style={{
        flex: 1,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        shadowColor: '#451B2D',
        shadowOffset: { width: 0, height: 9 },
        shadowOpacity: 0.18,
        shadowRadius: 21,
      }}>
        <Image
          source={{ uri: 'https://image.tmdb.org/t/p/w1280/' + item.poster_path }}
          style={{ height: (width - 50) / 2, flex: 1, borderTopLeftRadius: 10, borderTopRightRadius: 10 }}
          resizeMode={'cover'}
        />
        <View style={{ flex: 1, padding: 10, }}>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent:'space-between' }}>
            <Text style={{ color: '#009ee5', flex: 2 }} numberOfLines={2}>{item.title}</Text>
            <Text style={{ color:'gray', fontSize: 12, flex: 1, textAlign:'right'}}>{`(${item.vote_average})`}</Text>
          </View>
          <Text numberOfLines={2} style={{ marginTop: 5, color:'gray'}}>{item.overview}</Text>
        </View>
      </View>
    </TouchableOpacity>)
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ height: 60, borderBottomColor: 'gray', borderBottomWidth: 1 }}>

          <View style={{ margin: 20, backgroundColor: '#cccccc', borderRadius: 5, alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row' }}>
            <TextInput
              style={{ paddingLeft: 10, height: 35, width: '80%' }}
              value={this.state.searchTerm}
              placeholder="Search"
              onChangeText={text => this.setState({ searchTerm: text }
                , () => { this.onSearchTextChangeNew(text) })}
              returnKeyType="search"
            />
          </View>
        </View>

        <View style={{ flex: 1 }}>
          <FlatList
            style={{ flex: 1 }}
            onEndReachedThreshold={.5}
            onEndReached={() => this.loadNextItems()}
            data={this.props.movieList}
            numColumns={2}
            keyExtractor={(item, index) => index.toString()}
            renderItem={this.renderItem}
          />
        </View>
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    movieList: state.user.movieList,
    isLoading: state.user.loading
  }
};

const mapDispatchToProps = dispatch => {
  return {
      getMovieList:(pageNo, lazyLoading) => getMovieList(pageNo,lazyLoading, dispatch),
      searchMovie:(searchTerm ,pageNo, lazyLoading) => searchMovie( searchTerm, pageNo, lazyLoading, dispatch)
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieList);
