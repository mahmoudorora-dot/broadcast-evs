import { AlertTriangle, Film, Image as ImageIcon } from "lucide-react";

interface MediaErrorProps {
  type?: "image" | "video";
  message?: string;
  className?: string;
}

export const MediaError = ({ type = "image", message, className = "" }: MediaErrorProps) => {
  const Icon = type === "video" ? Film : ImageIcon;
  
  return (
    <div className={`flex flex-col items-center justify-center bg-muted/50 border border-border rounded-lg p-6 text-center ${className}`}>
      <AlertTriangle size={32} className="text-destructive mb-2" />
      <Icon size={24} className="text-muted-foreground mb-2" />
      {message ? (
        <p className="text-xs text-muted-foreground">{message}</p>
      ) : (
        <p className="text-xs text-muted-foreground">
          Failed to load {type}
        </p>
      )}
    </div>
  );
};
