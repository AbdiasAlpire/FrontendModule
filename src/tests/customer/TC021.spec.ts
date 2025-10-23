import { mergeTests } from "@playwright/test";
import {
  test as customerTest,
  expect,
} from "../../fixtures/CustomerPageFixture";
import { test as loggedInTest } from "../../fixtures/LoggedInFixture";
import * as dotenv from "dotenv";

const test = mergeTests(loggedInTest, customerTest);

dotenv.config();
