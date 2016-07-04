import {
  deepOrange100, deepOrange500, deepOrange700,
  pinkA200, tealA100, lightBlue500, grey900,
  white, grey400, darkBlack, blueGrey500
} from 'material-ui/styles/colors'
import {fade} from 'material-ui/utils/colorManipulator'
import Spacing from 'material-ui/styles/spacing'
import zIndex from 'material-ui/styles/zIndex'

export default {
  spacing: Spacing,
  zIndex: zIndex,
  fontFamily: 'Roboto, sans-serif',
  palette: {
    primary1Color: deepOrange500,
    primary2Color: deepOrange700,
    primary3Color: deepOrange100,
    accent1Color: blueGrey500,
    accent2Color: tealA100,
    accent3Color: lightBlue500,
    textColor: grey900,
    alternateTextColor: white,
    canvasColor: white,
    borderColor: grey400,
    disabledColor: fade(darkBlack, 0.3),
    pickerHeaderColor: pinkA200
  }
}
