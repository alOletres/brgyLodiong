/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  ButtonProps,
  Button,
  TableCellProps,
  Box,
  Theme,
  Chip,
} from "@mui/material";
import React, { memo } from "react";
import { useHook } from "./hooks/useTable";
import { Typography, SxProps } from "@mui/material";
import { CustomDateRangePickerProps } from "./DateRange";

import Avatar from "@mui/material/Avatar";
import { Person2Rounded } from "@mui/icons-material";
import DatePicker, { CustomDatePickerProps } from "./DatePicker";
import { ModalFormProps, saveButtonWrapper } from "./Modal";
import { useHook as useModal } from "./hooks/useModal";
import { Form, Formik } from "formik";
import CustomDateTimePicker from "./DateTimePicker";
import { CustomInput as Input } from "./TextFieldInput";
import Select from "./Select";
import TextArea from "./TextArea";

export interface DateRangeValues {
  startDate: string;
  endDate: string;
}
const container: SxProps<Theme> = {
  width: "100%",
  overflow: "hidden",
  marginTop: 2,
};

const tableHeaderWrapper: SxProps<Theme> = {
  display: "flex",
  width: "100%",
  justifyContent: "space-between",
  padding: 1,
};

/**
 * extends {@link ButtonProps}
 */
export interface ActionButtonProps<T> extends ButtonProps {
  handleClick: (element?: T) => void;
}

export interface HeaderActions<
  T extends
    | ActionButtonProps<any>
    | CustomDateRangePickerProps
    | CustomDatePickerProps
> {
  actionType: "button" | "dateRange" | "date";
  actionProps: T;
}

export interface TableActions {
  cellActions?: ActionButtonProps<any>[];
  headerActions?: HeaderActions<
    ActionButtonProps<any> | CustomDateRangePickerProps
  >[];
}

/**
 * Column properties
 * @key is from the generic type and represent as a value to be displayed
 * @label the label of each columns
 * @align the alignment of each cells
 * @format this type was able to manipulate numbers format
 */
export interface ColumnSchema<T> extends TableActions {
  key: keyof T;
  label: string;
  minWidth?: number;
  align?: TableCellProps["align"];
  format?: (value: number) => string;
  type?: "file";
}

/**
 * CustomTable properties
 * @datasource the data array list or content in the table
 * @columns which defined specific display in table list
 */
export interface CustomTableProps<T = any> extends TableActions {
  tableHeader?: string;
  dataSource: T[];
  columns: ColumnSchema<any>[];
  formProps?: ModalFormProps<any>;
  btnName?: string;
  handleExportToPdf?: () => void;
}

const CustomTable = ({
  tableHeader,
  dataSource,
  columns,
  cellActions,
  headerActions,
  formProps,
  btnName,
  handleExportToPdf,
}: CustomTableProps) => {
  const {
    page,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
    isButton,
  } = useHook();

  const {
    isInputField,
    isSelectField,
    isTextAreaField,
    isDateField,
    isDateTimeField,
  } = useModal();

  return (
    <Paper sx={container}>
      {/* Form props */}
      {formProps && Object.keys(formProps).length ? (
        <Formik
          initialValues={formProps.initialValues}
          validationSchema={formProps.validationSchema}
          onSubmit={formProps.handleSubmit}
          enableReinitialize
        >
          {({ submitForm, isSubmitting, setFieldValue, values }) => {
            return (
              <Form>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row", // Ensures all children are in a row
                    gap: 2, // Adds spacing between children
                    width: "100%", // Makes sure the container spans the full width
                  }}
                >
                  {formProps.fields.map((field, index) => {
                    if (isInputField(field)) {
                      return (
                        <Input
                          sx={{ flex: 1 }} // Ensures equal width
                          {...field.fieldProps}
                          onChange={(e) => {
                            if (field.fieldProps.name) {
                              if (field.fieldProps.type === "file") {
                                const target = e.target as HTMLInputElement; // Type assertion

                                const file = target.files?.[0];

                                setFieldValue(field.fieldProps.name, file); // Update Formik state with file object
                              } else {
                                setFieldValue(
                                  field.fieldProps.name,
                                  e.target.value
                                ); // Handle other input types
                              }
                            }
                          }}
                          key={index}
                        />
                      );
                    }

                    if (isSelectField(field)) {
                      // eslint-disable-next-line @typescript-eslint/no-unused-vars
                      const { handleSelectChange, onChange, ...props } =
                        field.fieldProps;

                      return (
                        <Select
                          sx={{ flex: 1 }} // Ensures equal width
                          {...props}
                          handleChange={(e) => {
                            if (field.fieldProps.name) {
                              setFieldValue(field.fieldProps.name, e);
                            }

                            if (handleSelectChange) {
                              const { propertyName, value } =
                                handleSelectChange(e);

                              setFieldValue(propertyName, value);
                            }
                          }}
                          value={values[props.name as string]}
                          key={index}
                        />
                      );
                    }

                    if (isTextAreaField(field)) {
                      return (
                        <TextArea
                          {...field.fieldProps}
                          onChange={(e) => {
                            if (field.fieldProps.name) {
                              setFieldValue(
                                field.fieldProps.name,
                                e.target.value
                              );
                            }
                          }}
                          key={index}
                        />
                      );
                    }

                    if (isDateField(field)) {
                      return (
                        <DatePicker
                          sx={{ flex: 1 }} // Ensures equal width
                          {...field.fieldProps}
                          key={index}
                          onChange={(e) => {
                            if (field.fieldProps.name) {
                              setFieldValue(field.fieldProps.name, e);
                            }
                          }}
                        />
                      );
                    }

                    if (isDateTimeField(field)) {
                      return (
                        <CustomDateTimePicker
                          {...field.fieldProps}
                          key={index}
                          onChange={(e) => {
                            if (field.fieldProps.name) {
                              setFieldValue(field.fieldProps.name, e);
                            }
                          }}
                        />
                      );
                    }
                  })}

                  <Box sx={saveButtonWrapper}>
                    <Button
                      sx={{ width: "100%", marginBottom: 0.9 }}
                      disabled={isSubmitting}
                      variant="contained"
                      onClick={submitForm}
                    >
                      {btnName}
                    </Button>

                    <Button
                      sx={{ width: "100%", marginBottom: 0.9 }}
                      variant="contained"
                      onClick={handleExportToPdf}
                    >
                      Export to Pdf
                    </Button>
                  </Box>
                </Box>
              </Form>
            );
          }}
        </Formik>
      ) : (
        <></>
      )}
      {/* Table heae */}
      {!!tableHeader || (headerActions && headerActions.length) ? (
        <Box sx={tableHeaderWrapper}>
          {!!tableHeader && (
            <Typography
              style={{
                fontWeight: "bold",
              }}
              variant="h6"
              component="div"
            >
              {tableHeader}
            </Typography>
          )}
          {headerActions && headerActions.length && (
            <Box sx={{ gap: 1, display: "flex" }}>
              {headerActions.map((component, key) => {
                if (isButton(component)) {
                  const { actionProps } = component;
                  const {
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    onClick,
                    handleClick,
                    variant = "contained",
                    ...props
                  } = actionProps;

                  return (
                    <Box
                      sx={{
                        paddingTop: 1,
                      }}
                      key={key}
                    >
                      <Button
                        key={key}
                        variant={variant}
                        {...props}
                        onClick={() => handleClick()}
                        sx={{ textTransform: "capitalize" }}
                      >
                        {props.name}
                      </Button>
                    </Box>
                  );
                }
              })}
            </Box>
          )}
        </Box>
      ) : null}

      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns?.length &&
                columns.map((column, index) => {
                  return (
                    <TableCell
                      sx={{ background: "#e8e1e3" }}
                      key={index}
                      align={column.align}
                      style={{
                        minWidth: column.minWidth ?? 80,
                        textTransform: "uppercase",
                        fontWeight: "bold",
                      }}
                    >
                      {column.label}
                    </TableCell>
                  );
                })}
            </TableRow>
          </TableHead>
          <TableBody>
            {dataSource?.length ? (
              dataSource
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  return (
                    <TableRow
                      sx={{ cursor: "pointer" }}
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={index}
                    >
                      {columns?.length &&
                        columns.map((column, cellIndex) => {
                          if (column.key !== "cellActions") {
                            {
                              return row[column.key] &&
                                typeof row[column.key] === "object" ? (
                                Object.values(row[column.key]).map(
                                  (c: any, cIndex: number) => {
                                    return (
                                      <Chip
                                        key={cIndex}
                                        label={c?.value}
                                        icon={
                                          <Avatar
                                            sx={{ width: 24, height: 24 }}
                                          >
                                            <Person2Rounded />
                                          </Avatar>
                                        }
                                      />
                                    );
                                  }
                                )
                              ) : (
                                <TableCell key={cellIndex} align={column.align}>
                                  {column?.format && row[column.key]
                                    ? column.format(row[column.key])
                                    : row[column.key]}
                                </TableCell>
                              );
                            }
                          } else {
                            return (
                              cellActions?.length && (
                                <TableCell
                                  key={cellIndex}
                                  align="center"
                                  sx={{
                                    display: "flex",
                                    width: "100%",
                                    gap: 1,
                                    textTransform: "capitalize",
                                  }}
                                >
                                  {cellActions.map((action, actionIndex) => {
                                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                                    const { onClick, handleClick, ...props } =
                                      action;
                                    return (
                                      <Button
                                        key={actionIndex}
                                        {...props}
                                        onClick={() => handleClick(row)}
                                      >
                                        {props.name}
                                      </Button>
                                    );
                                  })}
                                </TableCell>
                              )
                            );
                          }
                        })}
                    </TableRow>
                  );
                })
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  sx={{ textAlign: "center" }}
                >
                  No data available.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={dataSource?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </Paper>
  );
};

export default memo(CustomTable);
