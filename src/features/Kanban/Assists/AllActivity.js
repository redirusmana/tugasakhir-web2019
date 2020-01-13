import React from "react";
import { Empty } from "antd";
import get from "lodash/get";
import Avatar from "../../../provider/Display/Avatar";
import LoadingCard from "../../../provider/Display/LoadingCard";
import api from "../../../provider/Tools/api";
import { dateFromNowString } from "../../../provider/Tools/converter";
import { assetsApiUrl } from "../../../provider/Tools/general";

class AllActivity extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      page: 10,
      loadingState: false,
      loading: false
    };
  }

  componentDidMount() {
    this.getActivities();
  }

  getActivities = () => {
    const { idBoard } = this.props;
    this.setState(
      {
        loading: true
      },
      () => {
        this._requestSource = api.generateCancelToken();
        api
          .get(`/api/board/${idBoard}/activities`, this._requestSource.token, {
            params: {
              limit: this.state.page
            }
          })
          .then(response => {
            const { data } = response;
            this.setState({
              dataSources: data.data,
              page: data.limit,
              loading: false
            });
          })
          .catch(error => console.log(error));
      }
    );
  };

  handleLoadMore = idBoard => {
    this.setState(
      prevState => ({
        loadingState: true,
        page: prevState.page + 10
      }),
      () => {
        this._requestSource = api.generateCancelToken();
        api
          .get(`/api/board/${idBoard}/activities`, this._requestSource.token, {
            params: {
              limit: this.state.page
            }
          })
          .then(response => {
            const { data } = response;
            this.setState({
              loadingState: false,
              dataSources: data.data,
              page: data.limit
            });
          })
          .catch(error => console.log(error));
      }
    );
  };

  render() {
    const { loadingState, dataSources, loading } = this.state;
    const { idBoard } = this.props;

    if (loading) {
      return <LoadingCard />;
    }
    const mappedActivity =
      Array.isArray(dataSources) && dataSources.length > 0 ? (
        dataSources.map(result => {
          let badge1 = null;
          let badge2 = null;
          let badge3 = null;
          let badge4 = null;

          if (get(result, "before.status") === "Not Started") {
            badge1 = "info";
          } else if (get(result, "before.status") === "In Progress") {
            badge1 = "primary";
          } else if (get(result, "before.status") === "Delayed") {
            badge1 = "warning";
          } else if (get(result, "before.status") === "Done") {
            badge1 = "success";
          } else if (get(result, "before.status") === "Dropped") {
            badge1 = "danger";
          }

          if (get(result, "after.status") === "Not Started") {
            badge2 = "info";
          } else if (get(result, "after.status") === "In Progress") {
            badge2 = "primary";
          } else if (get(result, "after.status") === "Delayed") {
            badge2 = "warning";
          } else if (get(result, "after.status") === "Done") {
            badge2 = "success";
          } else if (get(result, "after.status") === "Dropped") {
            badge2 = "danger";
          }

          if (get(result, "before.priority") === "Low Priority") {
            badge3 = "success";
          } else if (get(result, "before.priority") === "Medium Priority") {
            badge3 = "warning";
          } else if (get(result, "before.priority") === "High Priority") {
            badge3 = "danger";
          }

          if (get(result, "after.priority") === "Low Priority") {
            badge4 = "success";
          } else if (get(result, "after.priority") === "Medium Priority") {
            badge4 = "warning";
          } else if (get(result, "after.priority") === "High Priority") {
            badge4 = "danger";
          }
          return (
            <React.Fragment
              key={`list-all-activity-on-board-${result.id}-${result.historiable_id}`}
            >
              <div className="media">
                <Avatar
                  size="md"
                  name={get(result, "user.name")}
                  image={
                    get(result, "user.avatar_path")
                      ? assetsApiUrl(get(result, "user.avatar_path"))
                      : undefined
                  }
                  title={get(result, "user.name")}
                  avatarClass="avatar-link m-1"
                />
                <div
                  className="media-body pl-1 align-self-center"
                  style={{ fontSize: "16px" }}
                >
                  <div className="activity-item-header">
                    <div>
                      <small>
                        <b className="font-weight-bold">
                          {get(result, "user.name")}
                        </b>{" "}
                        {result.event} on <u>Card</u>{" "}
                        <b className="font-weight-bold">???</b>
                      </small>
                    </div>
                    <div>
                      <small className="font-weight-light">
                        {dateFromNowString(result.created_at)}
                      </small>
                    </div>
                  </div>
                  <div className="card activity-card">
                    <div className="card-body">
                      {result.event === "has created new" && (
                        <small>
                          {result.event} <b>{get(result, "after.title")}</b>{" "}
                          {result.attribute}
                        </small>
                      )}

                      {result.event === "has updated card" && (
                        <React.Fragment>
                          <div>
                            {get(result, "before.title") &&
                              get(result, "after.title") && (
                                <div>
                                  <small>
                                    <b>Updated</b> Title Card
                                    <br />
                                    From :{" "}
                                    <del>{get(result, "before.title")}</del>
                                    <br />
                                    To :{" "}
                                    <b className="pt-2">
                                      {get(result, "after.title")}
                                    </b>
                                    <br />
                                  </small>
                                </div>
                              )}

                            {get(result, "before.description") === null &&
                              get(result, "after.description") && (
                                <div>
                                  <small>
                                    <b>Added</b> description{" "}
                                    <b>"{get(result, "after.description")}"</b>
                                    <br />
                                  </small>
                                </div>
                              )}

                            {get(result, "before.description") &&
                              get(result, "after.description") && (
                                <div>
                                  <small>
                                    <b>Updated</b> Description <br />
                                    From :{" "}
                                    <del>
                                      {get(result, "before.description")}
                                    </del>
                                    <br />
                                    To :{" "}
                                    <b className="pt-2">
                                      {get(result, "after.description")}
                                    </b>
                                    <br />
                                  </small>
                                </div>
                              )}

                            {get(result, "before.due_date") === null &&
                              get(result, "after.due_date") && (
                                <div>
                                  <small>
                                    <b>Added</b> Due Date <br />
                                    <b>"{get(result, "after.due_date")}"</b>
                                    <br />
                                  </small>
                                </div>
                              )}

                            {get(result, "before.due_date") &&
                              get(result, "after.due_date") && (
                                <div>
                                  <small>
                                    <b>Updated</b> Due Date <br />
                                    From :{" "}
                                    <del>{get(result, "before.due_date")}</del>
                                    <br />
                                    To :{" "}
                                    <b className="pt-2">
                                      {get(result, "after.due_date")}
                                    </b>
                                    <br />
                                  </small>
                                </div>
                              )}

                            {get(result, "before.status") === null &&
                              get(result, "after.status") && (
                                <div>
                                  <small>
                                    <b>Added</b> Status{" "}
                                    <span
                                      className={`w-100 badge badge-${badge2} mt-1`}
                                    >
                                      {get(result, "after.status")}
                                    </span>
                                    <br />
                                  </small>
                                </div>
                              )}

                            {get(result, "before.status") &&
                              get(result, "after.status") && (
                                <div>
                                  <small>
                                    <b>Updated</b> Status{" "}
                                    <span
                                      className={`w-100 badge badge-${badge1} mb-1`}
                                    >
                                      <del>{get(result, "before.status")}</del>
                                    </span>
                                    <span
                                      className={`w-100 badge badge-${badge2} mt-1`}
                                    >
                                      {get(result, "after.status")}
                                    </span>
                                    <br />
                                  </small>
                                </div>
                              )}

                            {get(result, "before.priority") === null &&
                              get(result, "after.priority") && (
                                <div>
                                  <small>
                                    <b>Added</b> Priority{" "}
                                    <span
                                      className={`w-100 badge badge-${badge4} mt-1`}
                                    >
                                      {get(result, "after.priority")}
                                    </span>
                                    <br />
                                  </small>
                                </div>
                              )}

                            {get(result, "before.priority") &&
                              get(result, "after.priority") && (
                                <div>
                                  <small>
                                    <b>Updated</b> Priority{" "}
                                    <span
                                      className={`w-100 badge badge-${badge3} mb-1`}
                                    >
                                      <del>
                                        {get(result, "before.priority")}
                                      </del>
                                    </span>
                                    <span
                                      className={`w-100 badge badge-${badge4} mt-1`}
                                    >
                                      {get(result, "after.priority")}
                                    </span>
                                    <br />
                                  </small>
                                </div>
                              )}
                          </div>
                        </React.Fragment>
                      )}

                      {result.event === "has commented" && (
                        <small>{get(result, "after.comment")}</small>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </React.Fragment>
          );
        })
      ) : (
        <React.Fragment>
          <div className="col-lg-24 text-center">
            <Empty description={"Activity Not Found"} />
          </div>
        </React.Fragment>
      );
    return (
      <React.Fragment>
        {mappedActivity}
        {loadingState && <LoadingCard />}

        <div className="card-footer ">
          {mappedActivity.length > 9 && (
            <u className="pointer" onClick={() => this.handleLoadMore(idBoard)}>
              Load More...
            </u>
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default AllActivity;
