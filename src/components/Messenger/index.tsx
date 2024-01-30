import React, { FC, useState, useEffect, useRef } from "react";

import { connect, useDispatch } from "react-redux";
import { Dispatch } from "redux";
import { mainActions } from "../../actions";
import { AppState } from "../../reducers";
import {
  getMainUsername,
  getMainMessagesList,
} from "../../selectors/mainSelector";
import { MessagesList } from "../../types";
import SendIcon from "@mui/icons-material/Send";
import {
  Box,
  Button,
  Input,
  InputLabel,
  Stack,
  Typography,
} from "@mui/material";
import { CustomMuiInput } from "./ui/custom-input";

export interface IHome {
  username: string;
  messages: MessagesList;
  getMessagesList: Function;
  sendMessage: Function;
}

const mapStateToProps = (state: AppState) => ({
  messages: getMainMessagesList(state),
  username: getMainUsername(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getMessagesList: () => dispatch(mainActions.mainMessagesListFetch()),
  sendMessage: (messageText: string) =>
    dispatch(mainActions.mainSendMessage(messageText)),
});

const Home: FC<IHome> = ({
  username,
  messages,
  getMessagesList,
  sendMessage,
}) => {
  const dispatch = useDispatch();
  const [messageText, setmessageText] = useState("");
  const messagesStackRef = useRef(null);

  useEffect(() => {
    getMessagesList();
  }, []);

  useEffect(() => {
    // messagesStackRef.current
  }, [messages]);

  return (
    <Box
      sx={{
        minWidth: 320,
        maxWidth: 900,
        height: "100vh",
        margin: "auto",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Stack
        ref={messagesStackRef}
        onScroll={(e) => {
          console.log(e);
        }}
        p={"14px"}
        spacing={2}
        sx={{
          width: "100%",
          height: "100%",
          overflowY: "auto",
          margin: 0,
          boxSizing: "border-box",
          background: "#f7fafc",
        }}
      >
        <Typography
          variant="body1"
          textAlign="center"
          color="grey"
          lineHeight={25}
        >
          {messages === null
            ? "Загрузка..."
            : messages !== null && !messages.length
            ? "Нет сообщений"
            : null}
        </Typography>

        {messages !== null &&
          messages.length &&
          messages.map((message) => (
            <Box position="relative">
              <Typography
                variant="body1"
                padding={2}
                pr={8}
                borderRadius={1}
                sx={{ background: "#e1e8f0", wordBreak: "break-all" }}
              >
                <Typography
                  variant="caption"
                  display="block"
                  fontWeight={600}
                  color="#4974ad"
                >
                  {message.sender}
                </Typography>
                {message.text}
              </Typography>
              <Typography
                variant="caption"
                display="block"
                right={6}
                bottom={1}
                color="#7b98ba"
                sx={{ position: "absolute" }}
              >
                {message.time}
              </Typography>
            </Box>
          ))}
      </Stack>
      <Box
        component="form"
        onSubmit={(e) => {
          e.preventDefault();
          if (messageText) {
            sendMessage(messageText);
            setmessageText("");
          }
        }}
        sx={{
          display: "flex",
          flexDirection: "row",
          background: "#bfcdde",
          maxHeight: "50px",
        }}
      >
        <Box
          sx={{ padding: "0px 8px 14px 0px", borderRight: "1px solid gray" }}
        >
          <InputLabel
            shrink
            htmlFor="bootstrap-input"
            sx={{ fontSize: 15, color: "grey", top: 7, left: 8 }}
          >
            Ваше имя:
          </InputLabel>
          <CustomMuiInput
            value={username}
            onChange={(e) => dispatch(mainActions.setUserName(e.target.value))}
            id="bootstrap-input"
            sx={{ fontWeight: 600, marginLeft: 1 }}
          />
        </Box>
        <Box p={"10px"} width={"100%"}>
          <Input
            value={messageText}
            onChange={(event) => {
              setmessageText(event.target.value);
            }}
            placeholder="Введите сообщение"
            fullWidth
            autoFocus
            disableUnderline
          />
        </Box>
        <Button
          endIcon={<SendIcon />}
          type="submit"
          sx={{
            background: "none !important",
            border: "none !important",
            padding: "0 !important",
            width: "40px",
            color: "grey",
          }}
        />
      </Box>
    </Box>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
