const API = {

  BASE_URL: "https://script.google.com/macros/s/AKfycbwzkcz2seD-3OCb2uWYhC2Oon_swZV4SYpOh6JUZXgg04Lx6UbCf1DlaHTmUWrwXWhr/exec",

  async post(action, data = {}) {

    const response = await fetch(this.BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        action,
        ...data
      })
    });

    return await response.json();

  }

};
