fetch('http://localhost:8080/table/payloads', {
      method: "DELETE",
      body: JSON.stringify({
        id: 1
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
    .then(res=> res.json())
    .then(data=>console.log(data))
    .catch(err=>console.error(err))