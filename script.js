class App extends React.Component {
  constructor() {
    super();
    this.state = { // stan komponentu
      searchText: '',
      users: []
    };
  }

  onChangeHandle(event) {
    this.setState({searchText: event.target.value}); //event.target.value to jest to co wpisujemy do wyszukiwania 
  }

  //Ta krótka metoda ma za zadanie zmienić stan searchText na taki
  //, jaki kryje się pod zdarzeniem zmiany inputa (event.target.value)

  onSubmit(event) {
    event.preventDefault();
    const {searchText} = this.state;	
    const url = `https://api.github.com/search/users?q=${searchText}`; //adres url razem z searchText
    fetch(url) // doczytać o fetch !-!-!
      .then(response => response.json()) //kiedy fetch() dostanie odpowiedź z serwera trafia tutaj obiekt typu Response, który przekształcamy na zrozumiały format
      .then(responseJson => this.setState({users: responseJson.items})); // ustawiamy stan users na tablice items ! 
  		//funkcja odpala funkcję
  }

  render() { // renderuje,tworzy element
    return (
      <div>
        <form onSubmit={event => this.onSubmit(event)}>  
          <label htmlFor="searchText">Search by user name</label>
          <input
            type="text" //wprowadzamy tekst
            id="searchText" // id tego inputa tosearchText
           	onChange={event => this.onChangeHandle(event)}
            value={this.state.searchText}/>
        </form>
        <UsersList users={this.state.users}/> 
      </div>
    );
  }
}

class UsersList extends React.Component { //zajmuje się odpowiednim wyświtleniem każdego jednego użytkownika zwróconego z serwera
  get users() {
    return this.props.users.map(user => <User key={user.id} user={user}/>);
    //dokonujemy przekształcenia tablicy, którą otrzymujemy z komponentu App mapując każdy jej element na komponent User
    //z propsami key oraz user
  }

  render() {
    return (
      <div>
        {this.users}
      </div>
    );
  }
}

class User extends React.Component { //odpowiedzialny za wyświetlanie pojedynczego użytkownika!
  render() {
    return (
      <div>
        <img src={this.props.user.avatar_url} style={{maxWidth: '100px'}}/>
        <a href={this.props.user.html_url} target="_blank">{this.props.user.login}</a>
      </div>
    );
  }
}

ReactDOM.render( //zamontuje główny komponent app pod element o id='root'
<App />,
document.getElementById('root')
);

