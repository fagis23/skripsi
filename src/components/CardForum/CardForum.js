import React, { useEffect, useState } from "react";

import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import axios from "../../config/axios";
import Avatar from "@material-ui/core/Avatar";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

const Forum = (props) => {
  const classes = useStyles();
  const [ownerThread, setOwnerThread] = useState({});
  const [commentUser, setCommentUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [loadingComment, setLoadingComment] = useState(false);
  const [imageComment, setImageComment] = useState("");
  const [image, setImage] = useState("");
  const [loadingImagePost, setLoadingImagePost] = useState(false);
  const [imagePostOwner, setimagePostOwner] = useState("");
  const [loadingImageComment, setLoadingImageComment] = useState(false);
  const [imagePostComment, setimagePostComment] = useState("");
  const [openImagePost, setOpenImagePost] = useState(false);
  dayjs.extend(relativeTime);

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      if (props.data !== undefined) {
        setOwnerThread(props.data);
      }
      if (props.comment !== undefined) {
        setCommentUser(props.comment);
      }
    }
    return () => (mounted = false);
  }, []);

  useEffect(() => {
    setLoading(true);
    if (props.data !== undefined) {
      axios
        .get(`/iati/upload-file/getImage?userId=${props.data.userTable.userId}`)
        .then((res) => {
          setLoading(false);
          setImage(res.data);
        })
        .catch((err) => {
          setLoading(false);
          setImage("");
        });
    }
  }, []);

  useEffect(() => {
    setLoadingComment(true);
    if (props.comment !== undefined) {
      axios
        .get(`/iati/upload-file/getImage?userId=${props.comment.userId}`)
        .then((res) => {
          setLoadingComment(false);
          setImageComment(res.data);
        })
        .catch((err) => {
          setLoadingComment(false);
          setImageComment("");
        });
    }
  }, []);

  useEffect(() => {
    setLoadingImagePost(true);
    if (props.data !== undefined) {
      axios
        .get(`/iati/upload-file/getPost/${props.data.postApplicationId}`)
        .then((res) => {
          setLoadingImagePost(false);
          setimagePostOwner(res.data);
        })
        .catch((err) => {
          setimagePostOwner("");
        });
    }
  }, []);

  useEffect(() => {
    setLoadingImageComment(true);
    if (props.comment !== undefined) {
      axios
        .get(`/iati/upload-file/getComment/${props.comment.commentId}`)
        .then((res) => {
          setLoadingImageComment(false);
          setimagePostComment(res.data);
        })
        .catch((err) => {
          setimagePostOwner("");
        });
    }
  }, []);

  return (
    <div className={classes.root}>
      {props.owner ? (
        ownerThread.userTable !== undefined && (
          <>
            <div className={classes.ownerForum}>
              <div className="img-container">
                <div className="img">
                  {loading ? (
                    <p>loading...</p>
                  ) : image === "" ? (
                    <Avatar
                      style={{ width: "85px", height: "85px" }}
                      alt="Remy Sharp"
                      src="/img/user.png"
                    />
                  ) : (
                    <Avatar
                      style={{ width: "85px", height: "85px" }}
                      src={`data:image/png;base64, ${image}`}
                      alt="Gambar User"
                    />
                  )}
                </div>
              </div>
              <div className="status">
                <div
                  style={{
                    display: "flex",
                    marginBottom: "10px",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    variant="h6"
                    style={{ fontWeight: "bold", color: "var(--mainColor)" }}
                  >
                    {ownerThread.userTable.username}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    style={{ color: "gray", marginLeft: "10px" }}
                  >
                    {dayjs(ownerThread.createdDateTime).fromNow()}
                  </Typography>
                </div>
                <Typography variant="h6" style={{ fontWeight: "lighter" }}>
                  {ownerThread.postDescription}
                </Typography>
                {loadingImagePost ? (
                  <p>...</p>
                ) : (
                  <div style={{ marginTop: "10px" }}>
                    {imagePostOwner === "" ? null : openImagePost ? (
                      <div onClick={() => setOpenImagePost(false)}>
                        <Typography
                          variant="caption"
                          style={{ fontWeight: "lighter", cursor: "pointer" }}
                        >
                          Close Image
                        </Typography>
                      </div>
                    ) : (
                      <div onClick={() => setOpenImagePost(true)}>
                        <Typography
                          variant="caption"
                          style={{ fontWeight: "lighter", cursor: "pointer" }}
                        >
                          See Image
                        </Typography>
                      </div>
                    )}

                    {openImagePost && (
                      <div className={classes.imageContainer}>
                        <img
                          src={`data:image/png;base64, ${imagePostOwner}`}
                          alt="post"
                          className={classes.postImage}
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </>
        )
      ) : (
        <>
          <div className={classes.rootComment}>
            <div className={classes.ownerForum}>
              <div className="img-container">
                <div className="img">
                  {loadingComment ? (
                    <p>...</p>
                  ) : imageComment === "" ? (
                    <Avatar
                      style={{ width: "85px", height: "85px" }}
                      src="/img/user.png"
                      alt="Gambar User"
                    />
                  ) : (
                    <Avatar
                      style={{ width: "85px", height: "85px" }}
                      src={`data:image/png;base64, ${imageComment}`}
                      alt="Gambar User"
                    />
                  )}
                </div>
              </div>
              <div className="status">
                <Typography
                  variant="h6"
                  style={{
                    fontWeight: "bold",
                    color: "var(--mainColor)",
                  }}
                >
                  {commentUser.userName}
                </Typography>
                <Typography variant="h6">{commentUser.comment}</Typography>
                {loadingImageComment ? (
                  <p>...</p>
                ) : (
                  <div style={{ marginTop: "10px" }}>
                    {imagePostComment === "" ? null : openImagePost ? (
                      <div onClick={() => setOpenImagePost(false)}>
                        <Typography
                          variant="caption"
                          style={{ fontWeight: "lighter", cursor: "pointer" }}
                        >
                          Close Image
                        </Typography>
                      </div>
                    ) : (
                      <div onClick={() => setOpenImagePost(true)}>
                        <Typography
                          variant="caption"
                          style={{ fontWeight: "lighter", cursor: "pointer" }}
                        >
                          See Image
                        </Typography>
                      </div>
                    )}

                    {openImagePost && (
                      <div className={classes.imageContainer}>
                        <img
                          src={`data:image/png;base64, ${imagePostComment}`}
                          alt="post"
                          className={classes.postImage}
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const useStyles = makeStyles({
  root: {
    marginBottom: "10px",
  },
  rootComment: {
    marginBottom: "4rem",
  },
  ownerForum: {
    display: "flex",
    height: "auto",
    "& .img-container": {
      marginRight: "2rem",
      "& .img": {
        width: "100px",
        height: "100px",
        padding: "0 20px",
        "& img": {
          objectFit: "cover",
          width: "100%",
          height: "100%",
          borderRadius: "50%",
        },
      },
    },
    "& .status": {
      flex: 1,
    },
  },
  imageContainer: {
    maxHeight: "300px",
    width: "300px",
    margin: "10px 0",
  },
  postImage: {
    objectFit: "cover",
    width: "100%",
    height: "100%",
  },
});

export default Forum;
