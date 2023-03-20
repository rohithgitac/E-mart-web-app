import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  FormLabel,
  FormControl,
  Table,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { getUserDetails, updateUserProfile } from "../actions/userActions";
import { myOrdersAction } from "../actions/orderActions";

const ProfileScreen = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const myorders = useSelector((state) => state.myorders);
  const { loading: loadingOrders, error: errorOrders, orders } = myorders;
  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
      if (!user.name) {
        dispatch(getUserDetails("profile"));
        dispatch(myOrdersAction());
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, navigate, userInfo, user]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(updateUserProfile({ id: user._id, name, email, password }));
    }
  };
  return (
    <Row>
      <Col md={3}>
        <h2>User profile</h2>
        {message && <Message variant="danger">{message}</Message>}
        {error && <Message variant="danger">{error}</Message>}
        {success && <Message variant="success">Profie Updated</Message>}
        {loading && <Loader></Loader>}
        <Form onSubmit={submitHandler}>
          <FormGroup controlId="name">
            <FormLabel>Name</FormLabel>
            <FormControl
              type="name"
              placeholder="enter your name "
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></FormControl>
          </FormGroup>

          <FormGroup controlId="email">
            <FormLabel>Email Address</FormLabel>
            <FormControl
              type="email"
              placeholder="enter email "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></FormControl>
          </FormGroup>

          <FormGroup controlId="password">
            <FormLabel>Password</FormLabel>
            <FormControl
              type="password"
              placeholder="enter your password "
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></FormControl>
          </FormGroup>

          <FormGroup controlId="confirmPassword">
            <FormLabel>Confirm Password</FormLabel>
            <FormControl
              type="confirmPassword"
              placeholder="enter your password again "
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></FormControl>
          </FormGroup>

          <Button type="submit" variant="primary">
            Update
          </Button>
        </Form>
      </Col>
      <Col md={9}>
        <h2> My Orders</h2>
        {loadingOrders ? (
          <Loader />
        ) : errorOrders ? (
          <Message variant="danger">{errorOrders}</Message>
        ) : 
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>Order I.D</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAYMENT STATUS</th>
                <th>DELIVERY STATUS</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => 
                ( 
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>{order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : 
                      <i className="fas fa-times" style={{ color: "red" }}></i>
                    }
                  </td>
                  <td>
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <i className="fas fa-times" style={{ color: "red" }}></i>
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button className="btn-sm" variant="light">
                        Details
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
                )
              )}
            </tbody>
          </Table>
        }
      </Col>
    </Row>
  );
};

export default ProfileScreen;
