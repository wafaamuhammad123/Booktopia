const API_BASE_URL = "http://localhost:4000/api";
export function fetchLogin(email, password) {
    const url = `${API_BASE_URL}/user/login`;
    const user = {
      email: email,
      password: password
    };
    return fetch(url, {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
            "Content-Type": "application/json"
        }
    }).then((response) => response.json());
}


export function logout(){
    localStorage.clear();
}