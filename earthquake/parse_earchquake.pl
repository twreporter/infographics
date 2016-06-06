#!/usr/local/bin/perl

use strict;

my $content;
open(my $fh, "<", "earthquake.htm") or die "can not open the file";
while (<$fh>) {
    $content .= $_;
}

#my $pattern = "<a id=\"ctl03_gvData_hlEventNo_.+?>(\d+?).+?<\/a>\.+?<\/td><td>.+?<a id=\"ctl03_gvData_hlOriginTime_.+?>(.+?)<\/a>.*?<\/td>.*?<td>.*?<a id=\"ctl03_gvData_hlDepth_.+?>(.+?)<\/a>.*?<\/td><td>.*?<a id=\"ctl03_gvData_hlMagnitudeValue_\d+\".+?>(.+?)<\/a>.*?</td><td>.*?<a id=\"ctl03_gvData_hlDescription.+?>(.+?)<\/a>";
my $pattern = "(<a id=\"ctl03_gvData_hlEventNo_.+?>(.+?) *?<\/a>.+?<a id=\"ctl03_gvData_hlOriginTime_.+?>(.+?)<\/a>.+?<a id=\"ctl03_gvData_hlDepth_.+?>(.+?)<\/a>.+?<a id=\"ctl03_gvData_hlMagnitudeValue_.+?>(.+?)<\/a>.+?<a id=\"ctl03_gvData_hlDescription.+?>(.+?)<\/a>)";

while ($content =~ s/$pattern//s) {
    print "$2, $3, $4, $5, $6\n";
}
