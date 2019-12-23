import React from "react";
import "../Style/style.css";
import get from "lodash/get";
import Popover from "antd/lib/popover";
import "antd/lib/popover/style/index.css";
import Avatar from "../../../provider/Display/Avatar";
import ProfileMember from "../Assists/ProfileMember";
import { assetsApiUrl } from "../../../provider/Tools/general";

class ListMemberFriend extends React.PureComponent {
  render() {
    const { listMemberBoard } = this.props;
    const mappedMemberBoard =
      Array.isArray(get(listMemberBoard, "members")) &&
      get(listMemberBoard, "members").length > 0
        ? get(listMemberBoard, "members").map(result => (
            <React.Fragment
              key={`list-mapped-member-Board-${result.id}-${result.user_id}`}
            >
              <div className="slice">
                <Popover
                  title="Invite Friends"
                  trigger="click"
                  content={<ProfileMember results={get(result, "user")} />}
                  placement="bottomLeft"
                  overlayClassName="xl popover-no-padding"
                >
                  <div>
                    <Avatar
                      name={get(result, "user.username")}
                      image={
                        get(result, "user.avatar_path")
                          ? assetsApiUrl(get(result, "user.avatar_path"))
                          : undefined
                      }
                      title={get(result, "user.username")}
                      size="sm"
                    />
                  </div>
                </Popover>
              </div>
            </React.Fragment>
          ))
        : [];
    return (
      <React.Fragment>
        {/* List Board */}
        <div className="d-flex flex-wrap">{mappedMemberBoard}</div>
      </React.Fragment>
    );
  }
}

export default ListMemberFriend;
