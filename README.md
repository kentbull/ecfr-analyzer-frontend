# eCFR Analyzer Frontend

### Getting started

To run the eCFR Analyzer along with the API use the Docker compose file as follows:

```shell
 docker compose up --wait
 ```

And then navigate to [http://localhost:3000](http://localhost:3000) in your browser.

You should see something that looks like

![this](https://i.ibb.co/YB9MP8Jj/ecfr-frontend-pic.png)

go here if the above image is not working: https://i.ibb.co/YB9MP8Jj/ecfr-frontend-pic.png



#### Stopping the app

To stop the app, run:

```shell
docker compose down
```


### Developing
Run the following command on your local environment:

```shell
git clone --depth=1 https://github.com/kentbull/ecfr-analyzer-frontend.git
cd ecfr-analyzer-frontend
pnpm install
```

Then, you can run locally in development mode with live reload:

```shell
pnpm run dev
```

### Building for production

To build the app for production, run:

```shell
make build
```
