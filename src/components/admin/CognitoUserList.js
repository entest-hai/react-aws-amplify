import {
  AutocompleteInput,
  Create,
  Datagrid,
  DateField,
  DateInput,
  Edit,
  EditButton,
  List,
  NumberField,
  NumberInput,
  ReferenceField,
  ReferenceInput,
  required,
  Show,
  ShowButton,
  SimpleForm,
  SimpleShowLayout,
  TextField,
  TextInput,
} from "react-admin";
import React from "react";

const CognitoUserListCustom = (props) => {
    return (
    <List {...props}>
      <Datagrid>
        <TextField source={"id"} label={"username"} sortable={false}></TextField>
        <TextField source={"Enabled"} sortable={false}></TextField>
        <TextField source={"UserStatus"} sortable={false}></TextField>
        <TextField source={"email_verified"} sortable={false}></TextField>
        <TextField source={"phone_number_verified"} sortable={false}></TextField>
        <TextField source={"UserLastModifiedDate"} sortable={false}></TextField>
        <TextField source={"UserCreateDate"} sortable={false}></TextField>
        <ShowButton></ShowButton>
        <EditButton></EditButton>
      </Datagrid>
    </List>
  );
}

const CognitoUserEditCustom = (props) => {
    return (
        <Edit {...props}>
            <SimpleForm>
                <TextInput source={"id"}></TextInput>
                <TextInput source={"email_verified"}></TextInput>
                <TextInput source={"phone_number_verified"}></TextInput>
                <TextInput source={"phone_number_verified"}></TextInput>
            </SimpleForm>
        </Edit>
    )
}

const CognitoUserCreateCustom = (props) => {
    return (
        <Create {...props}>
            <SimpleForm>
                <TextInput source={"id"}></TextInput>
                <TextInput source={"email_verified"}></TextInput>
                <TextInput source={"phone_number_verified"}></TextInput>
                <TextInput source={"phone_number_verified"}></TextInput>
            </SimpleForm>
        </Create>
    )
}


export {CognitoUserListCustom, CognitoUserEditCustom, CognitoUserCreateCustom};