# Docker File Notes

Ethan Isakson

## FROM

Whenever possible, use current official images as the basis for your images. We recommend the Alpine image as it is tightly controlled and small in size (currently under 6 MB), while still being a full Linux distribution.

## LABEL

You can add labels to your image to help organize images by project, record licensing information, to aid in automation, or for other reasons. For each label, add a line beginning with LABEL and with one or more key-value pairs. The following examples show the different acceptable formats. Explanatory comments are included inline.

Strings with spaces must be quoted or the spaces must be escaped. Inner quote characters (&quot;), must also be escaped.

### Set one or more individual labels
````
LABEL com.example.version=&quot;0.0.1-beta&quot;

LABEL vendor1=&quot;ACME Incorporated&quot;

LABEL vendor2=ZENITH\ Incorporated

LABEL com.example.release-date=&quot;2015-02-12&quot;

LABEL com.example.version.is-production=&quot;&quot;
````
An image can have more than one label. Prior to Docker 1.10, it was recommended to combine all labels into a single LABEL instruction, to prevent extra layers from being created. This is no longer necessary, but combining labels is still supported.

### Set multiple labels on one line
````
LABEL com.example.version=&quot;0.0.1-beta&quot; com.example.release-date=&quot;2015-02-12&quot;
````
The above can also be written as:

### Set multiple labels at once, using line-continuation characters to break long lines
````
LABEL vendor=ACME\ Incorporated \

com.example.is-beta= \

com.example.is-production=&quot;&quot; \

com.example.version=&quot;0.0.1-beta&quot; \

com.example.release-date=&quot;2015-02-12&quot;
````
For information about querying labels, refer to the items related to filtering in Managing labels on objects.

## RUN

Split long or complex RUN statements on multiple lines separated with backslashes to make your Dockerfile more readable, understandable, and maintainable.

### apt-get

Probably the most common use-case for RUN is an application of apt-get. Because it installs packages, the RUN apt-get command has several gotchas to look out for.

Always combine RUN apt-get update with apt-get install in the same RUN statement. For example:
````
RUN apt-get update &amp;&amp; apt-get install -y\

package-bar \

package-baz \

package-foo \

&amp;&amp; rm -rf /var/lib/apt/lists/\*
````
Using apt-get update alone in a RUN statement causes caching issues and subsequent apt-get install instructions fail. For example, say you have a Dockerfile:

### syntax=docker/dockerfile:1
````
FROM ubuntu:18.04

RUN apt-get update

RUN apt-get install -y curl
````
After building the image, all layers are in the Docker cache. Suppose you later modify apt-get install by adding extra package:

### syntax=docker/dockerfile:1
````
FROM ubuntu:18.04

RUN apt-get update

RUN apt-get install -y curl nginx
````
Docker sees the initial and modified instructions as identical and reuses the cache from previous steps. As a result, the apt-get update is not executed because the build uses the cached version. Because the apt-get update is not run, your build can potentially get an outdated version of the curl and nginx packages.

Using RUN apt-get update &amp;&amp; apt-get install -y ensures your Dockerfile installs the latest package versions with no further coding or manual intervention. This technique is known as &quot;cache busting&quot;. You can also achieve cache-busting by specifying a package version. This is known as version pinning, for example:

RUN apt-get update &amp;&amp; apt-get install -y\
````
package-bar \

package-baz \

package-foo=1.3.\*
````
Version pinning forces the build to retrieve a particular version regardless of what&#39;s in the cache. This technique can also reduce failures due to unanticipated changes in required packages.

Below is a well-formed RUN instruction that demonstrates all the apt-get recommendations.
````
RUN apt-get update &amp;&amp; apt-get install -y\

aufs-tools \

automake \

build-essential \

curl \

dpkg-sig \

libcap-dev \

libsqlite3-dev \

mercurial \

reprepro \

ruby1.9.1 \

ruby1.9.1-dev \

s3cmd=1.1.\*\

&amp;&amp; rm -rf /var/lib/apt/lists/\*
````
The s3cmd argument specifies a version 1.1.\*. If the image previously used an older version, specifying the new one causes a cache bust of apt-get update and ensures the installation of the new version. Listing packages on each line can also prevent mistakes in package duplication.

In addition, when you clean up the apt cache by removing /var/lib/apt/lists it reduces the image size, since the apt cache is not stored in a layer. Since the RUN statement starts with apt-get update, the package cache is always refreshed prior to apt-get install.

### Using pipes

Some RUN commands depend on the ability to pipe the output of one command into another, using the pipe character (|), as in the following example:
````
RUN wget -O - https://some.site | wc -l\&gt; /number
````
Docker executes these commands using the /bin/sh -c interpreter, which only evaluates the exit code of the last operation in the pipe to determine success. In the example above this build step succeeds and produces a new image so long as the wc -l command succeeds, even if the wget command fails.

If you want the command to fail due to an error at any stage in the pipe, prepend set -o pipefail &amp;&amp; to ensure that an unexpected error prevents the build from inadvertently succeeding. For example:
````
RUN set-o pipefail &amp;&amp; wget -O - https://some.site | wc -l\&gt; /number
````
Not all shells support the -o pipefail option.

In cases such as the dash shell on Debian-based images, consider using the exec form of RUN to explicitly choose a shell that does support the pipefail option. For example:
````
RUN [&quot;/bin/bash&quot;, &quot;-c&quot;, &quot;set -o pipefail &amp;&amp; wget -O - https://some.site | wc -l \&gt; /number
````
## ADD or COPY

Although ADD and COPY are functionally similar, generally speaking, COPY is preferred. That&#39;s because it&#39;s more transparent than ADD. COPY only supports the basic copying of local files into the container, while ADD has some features (like local-only tar extraction and remote URL support) that are not immediately obvious. Consequently, the best use for ADD is local tar file auto-extraction into the image, as in ADD rootfs.tar.xz /.

If you have multiple Dockerfile steps that use different files from your context, COPY them individually, rather than all at once. This ensures that each step&#39;s build cache is only invalidated (forcing the step to be re-run) if the specifically required files change.

For example:
````
COPY requirements.txt /tmp/

RUN pip install --requirement /tmp/requirements.txt

COPY . /tmp/
````
Results in fewer cache invalidations for the RUN step, than if you put the COPY . /tmp/ before it.

Because image size matters, using ADD to fetch packages from remote URLs is strongly discouraged; you should use curl or wget instead. That way you can delete the files you no longer need after they&#39;ve been extracted, and you don&#39;t have to add another layer in your image. For example, you should avoid doing things like:
````
ADD https://example.com/big.tar.xz /usr/src/things/

RUN tar-xJf /usr/src/things/big.tar.xz -C /usr/src/things

RUN make -C /usr/src/things all

And instead, do something like:

RUN mkdir -p /usr/src/things \

&amp;&amp; curl -SL https://example.com/big.tar.xz \

| tar-xJC /usr/src/things \

&amp;&amp; make -C /usr/src/things all
````
For other items (files, directories) that do not require ADD&#39;s tar auto-extraction capability, you should always use COPY.


Cite: -https://docs.docker.com/develop/develop-images/dockerfile_best-practices/
