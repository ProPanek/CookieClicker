import React, { Component } from "react";
import {
  Grid,
  Paper,
  Typography,
  Button
} from "../../../node_modules/@material-ui/core";

class CookieUpgrades extends Component {
  windowHeight() {
    return document.documentElement.scrollHeight - 100;
  }
  countPrice = (index, amount) => {
    let price = 0;

    for (let i = 1; i <= amount; i++) {
      price +=
        this.props.upgrades[index].basePrice *
        Math.pow(1.15, this.props.upgrades[index].count + (i - 1));
    }

    return this.nFormatter(price.toFixed(0), 2);
  };

  buttonCheck = index => {
    if (
      this.props.upgrades[index].count >= 1 &&
      this.props.upgrades[index].multiplierUpgradeLevel === 0
    ) {
      return false;
    } else if (
      this.props.upgrades[index].count >= 5 &&
      this.props.upgrades[index].multiplierUpgradeLevel === 1
    ) {
      return false;
    } else if (
      this.props.upgrades[index].count >= 25 &&
      this.props.upgrades[index].multiplierUpgradeLevel === 2
    ) {
      return false;
    } else if (
      this.props.upgrades[index].count >= 50 &&
      this.props.upgrades[index].multiplierUpgradeLevel === 3
    ) {
      return false;
    } else if (
      this.props.upgrades[index].count >= 100 &&
      this.props.upgrades[index].multiplierUpgradeLevel === 4
    ) {
      return false;
    } else if (
      this.props.upgrades[index].count >= 150 &&
      this.props.upgrades[index].multiplierUpgradeLevel === 5
    ) {
      return false;
    } else if (
      this.props.upgrades[index].count >= 200 &&
      this.props.upgrades[index].multiplierUpgradeLevel === 6
    ) {
      return false;
    } else if (
      this.props.upgrades[index].count >= 250 &&
      this.props.upgrades[index].multiplierUpgradeLevel === 7
    ) {
      return false;
    } else if (
      this.props.upgrades[index].count >= 300 &&
      this.props.upgrades[index].multiplierUpgradeLevel === 8
    ) {
      return false;
    } else if (
      this.props.upgrades[index].count >= 350 &&
      this.props.upgrades[index].multiplierUpgradeLevel === 9
    ) {
      return false;
    } else if (
      this.props.upgrades[index].count >= 400 &&
      this.props.upgrades[index].multiplierUpgradeLevel === 10
    ) {
      return false;
    } else return true;
  };

  nFormatter(num, digits) {
    //https://stackoverflow.com/questions/9461621/how-to-format-a-number-as-2-5k-if-a-thousand-or-more-otherwise-900-in-javascrip
    var si = [
      { value: 1, symbol: "" },
      { value: 1e3, symbol: "k" },
      { value: 1e6, symbol: "Mil" },
      { value: 1e9, symbol: "Bil" },
      { value: 1e12, symbol: "Tri" },
      { value: 1e15, symbol: "Quad" },
      { value: 1e18, symbol: "Quin" },
      { value: 1e21, symbol: "Sext" },
      { value: 1e24, symbol: "Sept" },
      { value: 1e27, symbol: "Oct" },
      { value: 1e30, symbol: "Non" }
    ];
    var rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    var i;
    for (i = si.length - 1; i > 0; i--) {
      if (num >= si[i].value) {
        break;
      }
    }
    return (num / si[i].value).toFixed(digits).replace(rx, "$1") + si[i].symbol;
  }

  render() {
    // const { mouse, grandma } = this.props.upgrades;
    return (
      <Grid
        item
        xs={6}
        style={{
          marginTop: 5,
          overflowX: "hidden",
          overflowY: "scroll",
          height: "calc(100vh - 70px)"
        }}
      >
        {this.props.upgrades
          .slice(0, this.props.level)
          .map((content, index) => (
            <Paper key={index}>
              <Typography variant="display1" align="center">
                <img src={content.gfx} alt={content.upgrade} />
              </Typography>
              <Typography variant="display1" align="center">
                {content.upgrade}
              </Typography>
              <Typography align="center">
                Ilość posiadanych: {content.count}
              </Typography>
              {this.buttonCheck(index) === false && (
                <Typography align="center">
                  Koszt ulepszenia mnożnika:{" "}
                  {this.nFormatter(content.multiplierUpgrade, 3)}
                </Typography>
              )}

              <Typography align="center">
                <Button
                  variant="contained"
                  color="inherit"
                  onMouseOver={this.handlePopoverOpen}
                  disabled={this.buttonCheck(index)}
                  onClick={() => {
                    this.props.onMultiplierUpgrade(index);
                  }}
                >
                  Mnożnik: {content.multiplier}
                </Button>
              </Typography>
              <Typography align="center" style={{ paddingBottom: "10px" }}>
                Koszt
              </Typography>
              <Paper
                square={true}
                classes={{
                  root: "shopPrice" // class name, e.g. `classes-nesting-root-x`
                }}
                align="center"
                style={{
                  display: "flex",
                  flexDirection: "row"
                }}
              >
                <Typography style={{ flex: "1", fontSize: "12px" }}>
                  {this.countPrice(index, 1)}{" "}
                </Typography>{" "}
                <Typography style={{ flex: "1", fontSize: "12px" }}>
                  {this.countPrice(index, 10)}{" "}
                </Typography>{" "}
                <Typography style={{ flex: "1", fontSize: "12px" }}>
                  {this.countPrice(index, 100)}{" "}
                </Typography>
              </Paper>
              <Paper
                square={true}
                classes={{
                  root: "shopPrice" // class name, e.g. `classes-nesting-root-x`
                }}
                align="center"
                style={{ width: "100%", display: "flex", flexDirection: "row" }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  style={{ flex: "1" }}
                  onClick={() => this.props.onUpgrade(index, 1)}
                >
                  Kup
                </Button>
                <Button
                  variant="contained"
                  style={{ flex: "1" }}
                  color="inherit"
                  onClick={() => this.props.onUpgrade(index, 10)}
                >
                  x10
                </Button>
                <Button
                  variant="contained"
                  style={{ flex: "1" }}
                  color="inherit"
                  onClick={() => this.props.onUpgrade(index, 100)}
                >
                  x100
                </Button>
              </Paper>
            </Paper>
          ))}
      </Grid>
    );
  }
}

export default CookieUpgrades;
