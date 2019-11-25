import React from "react";
import ListSearch from "./ListSearch";
import Modal from "../../../provider/Display/Modal";
import Avatar from "../../../provider/Display/Avatar";
import popConfirm from "../../../provider/Display/popConfirm";
import FormAddFriend from "../Modal/FormAddFriend";

class ListFriends extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false
    };
  }
  handleModal = () => {
    this.setState({
      isVisible: true
    });
  };

  handleClose = () => {
    this.setState({
      isVisible: false
    });
  };
  onDeleteFriend = () => {
    popConfirm({
      title: `Are you sure to remove this Request?`,
      message: "Project Tracker will deleted permanently",
      okText: " Yes",
      cancelText: " No"
    });
  };
  render() {
    const { isVisible } = this.state;
    return (
      <React.Fragment>
        <ListSearch />
        {/* List Friend */}
        <div className="col-lg-8 mb-3">
          <div className="card">
            <div className="card-body">
              <div className="text-center">
                <Avatar
                  name="Martin E"
                  size="xxxl"
                  avatarClass="avatar-link mb-1"
                />
                <h4 className="card-title text-center pt-2">
                  Muhammad Seftikara Al
                </h4>
                <button
                  type="button"
                  className="btn rounded-pill btn-success mr-1"
                >
                  <i className="font-weight-normal icofont-info-circle" />
                  {/* ui-message */}
                  {/* Invite */}
                </button>
                <button
                  type="button"
                  onClick={() => this.onDeleteFriend()}
                  className="btn rounded-pill btn-success ml-1"
                >
                  <i className="font-weight-normal icofont-bin" />
                  {/* Remove / danger*/}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Add new Friend */}
        <div className="col-lg-8 mb-3">
          <div className="card p-5">
            <div className="card-body ">
              <div className="text-center">
                <h4 className="text-success ">
                  <i className="icofont-people icofont-5x" />
                  <br /> Tambahkan Teman
                </h4>
              </div>
              <div className="text-center">
                <button
                  type="button"
                  onClick={() => this.handleModal()}
                  className="btn rounded-pill btn-success "
                >
                  <i className="font-weight-normal icofont-plus" />
                  {/* Add new Friend */} Teman
                </button>
              </div>
            </div>
          </div>
        </div>
        <Modal
          title="Add New Friend"
          visible={isVisible}
          size="small"
          handleBack={this.handleClose}
        >
          <div className="container">
            <FormAddFriend />
          </div>
        </Modal>
      </React.Fragment>
    );
  }
}

export default ListFriends;
