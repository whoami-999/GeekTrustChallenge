import { Component } from "react";
import Pagination from "react-js-pagination";
import DisplayUser from "../DisplayUser";
import "./index.css";

class Admin extends Component {
  state = { usersList: [] };

  componentDidMount() {
    this.renderUsersData();
  }

  editItem = (id, name, email, role) => {
    const { usersList } = this.state;

    if (name === "" && email === "" && role === "") {
      name = usersList[id].name;
      email = usersList[id].email;
      role = usersList[id].role;
    } else if (name === "") {
      name = usersList[id].name;
    } else if (email === "") {
      email = usersList[id].email;
    } else if (role === "") {
      role = usersList[id].role;
    }
    const b = {
      id: id,
      name: name,
      email: email,
      role: role,
    };
    console.log(b);
    usersList[id] = b;
  };

  deleteItem = (value) => {
    const { usersList } = this.state;
    const updatedList = usersList.filter((each) => each.id !== value);
    this.setState({ usersList: updatedList });
  };

  renderUsersData = async () => {
    const getUsersApi =
      "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";
    const options = { method: "GET" };

    const usersListResponse = await fetch(getUsersApi, options);
    const usersListData = await usersListResponse.json();

    this.setState({ usersList: usersListData });
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
      </div>
    );
  }
}

export default Admin;
