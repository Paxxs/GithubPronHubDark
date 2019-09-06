import fetch from "node-fetch";




async function Main(): Promise<void> {
  const theme = await GetMasterTheme();
  const lastSnapshots = await GetLastSnapshots();
  const newSnapshots = await GetNewSnapshots();

}


interface urlStylePair {
  url: string
  css: string
}

function GetMasterTheme(): Promise<string> {
  return fetch(`https://raw.githubusercontent.com/acoop133/GithubDarkTheme/Theme.css`)
    .then(response => response.text())
    .then(data => {
      return data;
    })
    .catch(function (error) {
      // handle error
      console.error(error);
      return "";
    });
}

function GetLastSnapshots(): Promise<string[]> {

}

async function GetNewSnapshots(): Promise<urlStylePair[]> {

  const urls = await fetch(`src\snapshotUrls.txt`)
    .then(response => response.text())
    .then((data) => {
      const split = data.split("\n")
      return split;
    });


  const pairs = urls.map(async (u: string) => {
    return await fetch(u)
      .then(response => response.body.read())
      .then((data: string) => {
        return { url: u, css: data } as urlStylePair;
      })
      .catch(function (error) {
        // handle error
        console.error(error);
        return { url: u, css: "" } as urlStylePair
      });
  });
  return await Promise.all(pairs);

}