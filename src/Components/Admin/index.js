import { Component } from "react";
import ReactPaginate from "react-paginate";

import DisplayUser from "../DisplayUser";
import "./index.css";

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offset: 0,
      usersList: [],
      perPage: 10,
      currentPage: 0,
    };
    this.handlePageClick = this.handlePageClick.bind(this);
  }

  componentDidMount() {
    this.renderUsersData();
  }

  editItem = (id, name, email, role) => {
    const { usersList } = this.state;

    if (name === "" && email === "" && role === "") {
      name = usersList[id].name;
      email = usersList[id].email;
      role = usersList[id].role;
    } else if (name === "" && email === "") {
      name = usersList[id].name;
      email = usersList[id].email;
    } else if (name === "" && role === "") {
      name = usersList[id].name;
      role = usersList[id].role;
    } else if (email === "" && role === "") {
      email = usersList[id].email;
      role = usersList[id].role;
    } else if (name === "") {
      name = usersList[id].name;
    } else if (email === "") {
      email = usersList[id].email;
    } else if (role === "") {
      role = usersList[id].role;
    }
    const updatedUser = {
      id: id,
      name: name,
      email: email,
      role: role,
    };

    const updatedUsersList = usersList.map(function (each) {
      if (each.id === id) {
        each = updatedUser;
        return each;
      } else {
        return each;
      }
    });
    this.setState({ usersList: updatedUsersList });
  };

  deleteItem = (value) => {
    const { usersList } = this.state;
    const updatedList = usersList.filter((each) => each.id !== value);

    const slice = updatedList.slice(
      this.state.offset,
      this.state.offset + this.state.perPage
    );

    this.setState({
      usersList: slice,
      pageCount: Math.ceil(updatedList.length / this.state.perPage),
    });
  };

  renderUsersData = async () => {
    const getUsersApi =
      "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";
    const options = { method: "GET" };

    const usersListResponse = await fetch(getUsersApi, options);
    const usersListData = await usersListResponse.json();

    const slice = usersListData.slice(
      this.state.offset,
      this.state.offset + this.state.perPage
    );
    this.setState({
      usersList: slice,
      pageCount: Math.ceil(usersListData.length / this.state.perPage),
    });
  };

  handlePageClick = (e) => {
    const selectedPage = e.selected;
    const offset = selectedPage * this.state.perPage;

    this.setState(
      {
        currentPage: selectedPage,
        offset: offset,
      },
      () => {
        this.renderUsersData();
      }
    );
  };

  render() {
    const { usersList } = this.state;

    return (
      <div>
        <div className="search-bar-container">
          <input className="search-bar" type="search" />
        </div>
        <ul className="user-list-container">
          <li>
            <div className="user-list-item">
              <input className="checkbox" type="checkbox" />
              <p className="heading">Name</p>
              <p className="heading">Email</p>
              <p className="heading">Role</p>
              <p className="heading">Actions</p>
            </div>
            <hr className="line" />
          </li>
          {usersList.map((eachUser) => (
            <DisplayUser
              onClickEdit={this.editItem}
              onClickDelete={this.deleteItem}
              key={eachUser.id}
              data={eachUser}
            />
          ))}
        </ul>
        <div className="page-container">
          <ReactPaginate
            previousLabel={"prev"}
            nextLabel={"next"}
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={this.state.pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={this.handlePageClick}
            containerClassName={"pagination"}
            subContainerClassName={"pages pagination"}
            activeClassName={"active"}
          />
        </div>
      </div>
    );
  }
}

export default Admin;
