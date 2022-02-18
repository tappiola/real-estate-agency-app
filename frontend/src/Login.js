import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {sendGraphqlRequest} from "./graphql";

const Login = () => {
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
        let navigate = useNavigate();

   const loginHandler = (event) => {
        event.preventDefault();

       const graphqlQuery = {
           query: `
        query {
          login(email: "${email}", password: "${password}") {
            userId
            token
          }
        }
      `
       };

        // this.setState({ authLoading: true });
        sendGraphqlRequest(graphqlQuery)
            .then(res => {
                if (res.status === 422) {
                    throw new Error('Validation failed.');
                }
                if (res.status !== 200 && res.status !== 201) {
                    console.log('Error!');
                    throw new Error('Could not authenticate you!');
                }
                return res.json();
            })
            .then(({data: {login}}) => {
                console.log(login);
                // this.setState({
                //     isAuth: true,
                //     token: resData.token,
                //     authLoading: false,
                //     userId: resData.userId
                // });
                localStorage.setItem('token', login.token);
                localStorage.setItem('userId', login.userId);
                navigate("/", {replace: true});
                // const remainingMilliseconds = 60 * 60 * 1000;
                // const expiryDate = new Date(
                //     new Date().getTime() + remainingMilliseconds
                // );
                // localStorage.setItem('expiryDate', expiryDate.toISOString());
                // this.setAutoLogout(remainingMilliseconds);
            })
            .catch(err => {
                console.log(err);
                // this.setState({
                //     isAuth: false,
                //     authLoading: false,
                //     error: err
                // });
            });
    };

        return <form onSubmit={loginHandler}>
        <input placeholder="Email" name="email" value={email} onChange={e => setEmail(e.target.value)}/>
        <input placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}/>
        <button type="submit">Login</button>
    </form>
};

export default Login;