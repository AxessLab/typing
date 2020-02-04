import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import whiteImage from "../../static/images/vita_illustrationer.svg";
import InstructionLayout from "../layout/InstructionLayout";
import buttonImageH from "../../static/images/h_button.svg";
import buttonImageJ from "../../static/images/j_button_small.svg";
import buttonImageK from "../../static/images/k_button.svg";
import buttonImageL from "../../static/images/l_button.svg";
import buttonImageÖ from "../../static/images/ö_button.svg";
import buttonImageÄ from "../../static/images/ä_button.svg";
import { connect } from "react-redux";
import { IRootState } from "../../shared/reducers";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(8),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center"
    },
    illustration: {
      position: "absolute",
      right: "7em",
      top: "10em",
      [theme.breakpoints.down("lg")]: {
        position: "relative",
        top: "0",
        right: "0"
      }
    },
    logo: {
      position: "absolute",
      top: "1em",
      left: "2em",
      height: "70px",
      [theme.breakpoints.down("md")]: {
        position: "relative",
        display: "block",
        top: "0",
        left: "0"
      }
    }
  })
);

const mapStateToProps = ({ game }: IRootState) => ({
  currentGameCharacter: game.gameCharacter
});

type StateProps = ReturnType<typeof mapStateToProps>;

export type IProps = StateProps;

const TaskInstruction = (props: IProps) => {
  const classes = useStyles();

  const { t } = useTranslation();

  const { currentGameCharacter } = props;
  const paragraphs = [
    t("task2-instructions.p1a") +
    currentGameCharacter.name +
    t("task2-instructions.p1b"),
    t("task2-instructions.p2"),
    t("task2-instructions.p3")
  ];
  return (
    <Grid container className={classes.root} spacing={8}>
      <InstructionLayout
        title={t("task2.mission2Text")}
        to='/task2/prestart'
        instructionToSpeak={paragraphs.join(" ")}
      >
        <Grid item xs={12} md={7}>
          <Typography variant='body1' align='left'>
            {paragraphs[0]}
          </Typography>
        </Grid>
        <Grid item xs={12} md={7}>
          <Typography variant='body1' align='left'>
            {paragraphs[1]}
          </Typography>
        </Grid>
        <Grid item xs={12} md={7}>
          <Typography variant='body1' align='left'>
            {paragraphs[2]}
          </Typography>
        </Grid>
      </InstructionLayout>
      <Grid item container justify='center'>
        <Grid item xs={12} md={1}>
          <img src={buttonImageH} alt='H knapp' />
        </Grid>
        <Grid item xs={12} md={1}>
          <img src={buttonImageJ} alt='J knapp' />
        </Grid>
        <Grid item xs={12} md={1}>
          <img src={buttonImageK} alt='K knapp' />
        </Grid>
        <Grid item xs={12} md={1}>
          <img src={buttonImageL} alt='L knapp' />
        </Grid>
        <Grid item xs={12} md={1}>
          <img src={buttonImageÖ} alt='Ö knapp' />
        </Grid>
        <Grid item xs={12} md={1}>
          <img src={buttonImageÄ} alt='Ä knapp' />
        </Grid>
      </Grid>
      <img
        src={whiteImage}
        alt='Vita illustrationer'
        className={classes.illustration}
      />
    </Grid>
  );
};

export default connect(mapStateToProps)(TaskInstruction);
