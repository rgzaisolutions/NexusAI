$ftpServer = "92.113.28.137"
$ftpUser = "u101882320.nexusai.raigzen.com"
$ftpPassword = "xuPUgi_89"
$localPath = "d:\OneDrive - Carlos\CARLOS\IA\PaginasWeb\NexusAI\dist"

function Upload-File($localFile, $remoteFile) {
    # Remove leading slash if any and ensure no double slashes
    $remoteFile = $remoteFile.TrimStart("/")
    $uriString = "ftp://$ftpServer/$remoteFile"
    Write-Host "Uploading to: $uriString"
    
    $uri = New-Object System.Uri($uriString)
    $request = [System.Net.FtpWebRequest]::Create($uri)
    $request.Credentials = New-Object System.Net.NetworkCredential($ftpUser, $ftpPassword)
    $request.Method = [System.Net.WebRequestMethods+Ftp]::UploadFile
    $request.UseBinary = $true
    $request.KeepAlive = $false
    
    try {
        $fileBytes = [System.IO.File]::ReadAllBytes($localFile)
        $request.ContentLength = $fileBytes.Length
        
        $requestStream = $request.GetRequestStream()
        $requestStream.Write($fileBytes, 0, $fileBytes.Length)
        $requestStream.Close()
        $requestStream.Dispose()
        Write-Host "Success: $remoteFile"
    }
    catch {
        Write-Error "Failed to upload $remoteFile : $_"
    }
}

function Create-Directory($remoteDir) {
    if ($remoteDir -eq "" -or $remoteDir -eq "/") { return }
    $remoteDir = $remoteDir.TrimStart("/").TrimEnd("/")
    $uriString = "ftp://$ftpServer/$remoteDir/"
    Write-Host "Creating Directory: $uriString"
    
    $request = [System.Net.FtpWebRequest]::Create($uriString)
    $request.Credentials = New-Object System.Net.NetworkCredential($ftpUser, $ftpPassword)
    $request.Method = [System.Net.WebRequestMethods+Ftp]::MakeDirectory
    try {
        $response = $request.GetResponse()
        $response.Close()
    }
    catch {
        # Directory might already exist
        Write-Host "Dir exists or error: $_"
    }
}

function Process-Directory($currentLocalPath, $currentRemotePath) {
    $items = Get-ChildItem $currentLocalPath
    foreach ($item in $items) {
        $newRemotePath = "$currentRemotePath" + $item.Name
        if ($item.PSIsContainer) {
            Create-Directory $newRemotePath
            Process-Directory $item.FullName "$newRemotePath/"
        }
        else {
            Upload-File $item.FullName $newRemotePath
        }
    }
}

Process-Directory $localPath ""
