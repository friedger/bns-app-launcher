var blockstackId = document.getElementById("blockstack-id");
var btnLaunch = document.querySelector(".btn-launch");
var loader = document.getElementById("loader");
blockstackId.addEventListener("keyup", function(event) {
  error.innerHTML = ""
  if (event.keyCode === 13) {
    event.preventDefault();
    btnLaunch.click();
  }
});

btnLaunch.addEventListener("click", function() {
  loader.style.display = "block";
  btnLaunch.style.display = "none";
  error.innerHTML = ""

  try {
    blockstack.lookupProfile(blockstackId.value).then(profile => {
      console.log({ profile });
      fetch(profile.url)
        .then(m => m.json())
        .then(manifest => {
          console.log(manifest);
          loader.style.display = "none";
          btnLaunch.style.display = "block";
          window.location.href = manifest.start_url;
        })
        .catch(e => {
          console.log("failed to launch", e);
          error.innerHTML = "Failed to launch " + e;
          loader.style.display = "none";
          btnLaunch.style.display = "block";
        });
    });
  } catch (e) {
    error.innerHTML = "Failed to launch " + e;
    loader.style.display = "none";
    btnLaunch.style.display = "block";
  }
});
