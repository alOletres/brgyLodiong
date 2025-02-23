import { useEffect, useRef } from "react";
import {
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Typography,
  Paper,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";

export interface FileUploadProps {
  multiple?: boolean;
  accept?: string[];
  value: File[];
  onChange: (files: File[]) => void;
  handleSubmit: () => void;
  btnName?: string;
  onFileChange?: (hasFile: boolean) => void; // ✅ New Prop
  // handleSetImage: (image: File[]) => void;
}

const MIMETypes = [
  ".xls",
  ".xlsx",
  ".doc",
  ".docx",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.ms-excel",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "image/jpeg",
  "image/png",
];

const MUIFileUpload = ({
  multiple = true,
  accept = MIMETypes,
  value,
  onChange,
  handleSubmit,
  btnName,
  onFileChange, // ✅ Capture the prop
}: // handleSetImage,
//
FileUploadProps) => {
  const hiddenFileInput = useRef<HTMLInputElement>(null);

  // ✅ Effect: Trigger onFileChange when value changes
  useEffect(() => {
    if (value.length > 0) {
      // handleSetImage(value);
      onFileChange?.(true);
    } else {
      onFileChange?.(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]); // Rerun if value updates (including from table row)

  // ✅ Function to check if file is an image
  const isImageFile = (file: File) => file.type.startsWith("image/");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFiles = Array.from(event.target.files);
      event.target.value = ""; // ✅ Reset input to allow re-selection of the same file

      const finalFiles = multiple
        ? Array.from(
            new Map(
              [...value, ...newFiles].map((file) => [file.name, file])
            ).values()
          )
        : newFiles;

      // handleSetImage(finalFiles);

      onChange(finalFiles);
      onFileChange?.(finalFiles.length > 0);
    }
  };

  // ✅ Handle file removal
  const handleFileRemove = (fileToRemove: File) => {
    const updatedFiles = value.filter((file) => file !== fileToRemove);

    onChange(updatedFiles);
  };

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      {/* ✅ Drag & Drop Box */}
      <Paper
        elevation={3}
        sx={{
          p: 3,
          textAlign: "center",
          border: "2px dashed #aaa",
          borderRadius: "8px",
          cursor: "pointer",
          backgroundColor: "#f9f9f9",
          "&:hover": { backgroundColor: "#f3f3f3" },
          width: "100%",
        }}
        onClick={() => hiddenFileInput.current?.click()}
      >
        <CloudUploadIcon sx={{ fontSize: 40, color: "#1976d2" }} />
        <Typography variant="body1" sx={{ fontWeight: 500 }}>
          Drag & Drop files here or click to upload
        </Typography>
        <input
          type="file"
          ref={hiddenFileInput}
          className="hidden"
          multiple={multiple}
          accept={accept.join(",")}
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
      </Paper>

      {/* ✅ File List with Image Preview */}
      {value.length > 0 && (
        <Paper
          elevation={2}
          sx={{ p: 2, maxHeight: "250px", overflowY: "auto" }}
        >
          <Typography variant="body2" fontWeight={600} mb={1}>
            Uploaded Files:
          </Typography>
          <List>
            {value.map((file, index) => (
              <ListItem
                key={index}
                secondaryAction={
                  <IconButton
                    edge="end"
                    color="error"
                    onClick={() => handleFileRemove(file)}
                  >
                    <DeleteIcon />
                  </IconButton>
                }
              >
                {/* ✅ Show image if file is an image */}
                {isImageFile(file) ? (
                  <Box
                    component="img"
                    src={URL.createObjectURL(file)}
                    alt={file.name}
                    sx={{
                      width: 50,
                      height: 50,
                      objectFit: "cover",
                      borderRadius: "4px",
                      marginRight: "10px",
                    }}
                  />
                ) : null}

                <ListItemText
                  primary={file.name}
                  secondary={`${(file.size / 1024).toFixed(2)} KB`}
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      )}

      {/* ✅ Upload Button */}
      {btnName ? (
        <Button
          variant="contained"
          color="primary"
          startIcon={<CloudUploadIcon />}
          onClick={handleSubmit}
        >
          {btnName}
        </Button>
      ) : null}
    </Box>
  );
};

export default MUIFileUpload;
