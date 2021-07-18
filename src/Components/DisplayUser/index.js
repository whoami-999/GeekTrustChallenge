import { Component } from "react";
import "./index.css";

const deleteIcon =
  "https://res.cloudinary.com/df9mebfal/image/upload/v1626517875/GeekTrust/delete_sgxkzy.png";

const editIcon =
  "https://res.cloudinary.com/df9mebfal/image/upload/v1626517986/GeekTrust/editing_tsbik7.png";

class DisplayUser extends Component {
  state = { isClickOnEdit: false, name: "", email: "", role: "" };

  componentDidMount() {}

  name = (event) => {
    this.setState({ name: event.target.value });
  };

  email = (event) => {
    this.setState({ email: event.target.value });
  };

  role = (event) => {
    this.setState({ role: event.target.value });
  };

  editElement = () => {
    this.setState((prev) => ({ isClickOnEdit: !prev.isClickOnEdit }));
  };

  submit = () => {
    const { onClickEdit, data } = this.props;
    const { name, email, role } = this.state;
    const { id } = data;

    onClickEdit(id, name, email, role);
    this.setState({ isClickOnEdit: false });
  };

  deleteElement = () => {
    const { data, onClickDelete } = this.props;
    const { id } = data;
    onClickDelete(id);
  };

  renderEditList = () => {
    return (
      <li>
        <div className="user-list-item">
          <input type="checkbox" className="checkbox" />

          <input onChange={this.name} type="text" />
          <input onChange={this.email} type="text" />
          <input onChange={this.role} type="text" />
          <div className="text">
            <img
              onClick={this.editElement}
              alt="edit"
              className="image"
              src={editIcon}
            />
            <img
              onClick={this.deleteElement}
              alt="delete"
              className="image"
              src={deleteIcon}
            />
          </div>
        </div>
        <div className="button-container">
          <button onClick={this.submit} className="button" type="button">
            Submit
          </button>
        </div>
        <hr className="line" />
      </li>
    );
  };

  renderList = () => {
    const { data } = this.props;

    const { name, email, role } = data;

    return (
      <li>
        <div className="user-list-item">
          <input type="checkbox" className="checkbox" />

          <p className="text">{name}</p>
          <p className="text">{email}</p>
          <p className="text">{role}</p>
          <div className="text">
            <img
              onClick={this.editElement}
              alt="edit"
              className="image"
              src={editIcon}
            />
            <img
              onClick={this.deleteElement}
              alt="delete"
              className="image"
              src={deleteIcon}
            />
          </div>
        </div>
        <hr className="line" />
      </li>
    );
  };

  render() {
    const { isClickOnEdit } = this.state;
    return <>{isClickOnEdit ? this.renderEditList() : this.renderList()}</>;
  }
}

export default DisplayUser;
