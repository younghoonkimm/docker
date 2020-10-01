const express = require("express");
const bodyParser = require("body-parser");
const db = require("./db");

const app = express();

app.use(bodyParser.json());

db.pool.query(
	`Create table lists()
    Id INTERGER AUTO_INCREMENT,
    Value Text,
    Prmary Key (id)
`,
	(err, res, fileds) => {
		console.log(res);
	}
);

app.get("/api/values", (req, res) => {
	db.pool.query("SELECT * FROM lists", (err, results, fileds) => {
		if (err) return res.status(500).send(err);
		else return res.json(results);
	});
});

app.post("api/value", (req, res) => {
	db.pool.query(
		`INSERT  INTO lists ${req.body.value}`,
		(err, results, fields) => {
			if (err) return res.status(500), send(err);
			else return res.json({ success: true, value: req.body.value });
		}
	);
});

app.listen(5000, () => {
	console.log("5000번 포트에서 시작되었습니다");
});
